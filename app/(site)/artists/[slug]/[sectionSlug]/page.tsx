import { notFound } from "next/navigation"
import { ArtistPage } from "@/components/pages"
import {
	getArtist,
	getArtistSections,
	getPage,
	getProjects,
} from "@/sanity/sanity-queries"
import { metadataFallback } from "@/utils"
import { ArtistSection } from "@/types"

export async function generateMetadata({
	params,
}: {
	params: { sectionSlug: string; slug: string }
}) {
	const { slug } = params
	const pageData = getPage(slug)
	const page = await pageData

	if (!page) {
		return metadataFallback
	}

	return {
		metadataBase: metadataFallback.metadataBase,
		title: page.metadataTitle || metadataFallback.title,
		description: page.metadataDescription || metadataFallback.description,
		keywords: page.metadataKeywords || metadataFallback.keywords,
	}
}

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic"

export default async function page({
	params,
}: {
	params: { sectionSlug: string; slug: string }
}) {
	const { sectionSlug, slug } = params
	const projects = await getProjects()
	const artistSections = await getArtistSections()
	const activeSection = artistSections.find(
		(section) => section.title.toLowerCase() === sectionSlug
	)
	const artist = await getArtist(slug)

	const artistProjects = projects.filter((project) => {
		if (!project.artist) return null
		return artist._id === project.artist._ref
	})

	if (!artistProjects) return notFound()

	const artistLinks = artistProjects.reduce<ArtistSection[]>((acc, project) => {
		if (project.artistSection) {
			project.artistSection.forEach((section) => {
				artistSections.forEach((artistSection) => {
					if (
						artistSection._id === section._ref &&
						!acc.includes(artistSection)
					) {
						acc.push(artistSection)
					}
				})
			})
		}
		return acc
	}, [])

	const orderedArtistLinks = artistLinks.sort((a, b) => a.order - b.order)

	const activeProjects = activeSection
		? artistProjects.filter((project) =>
				project.artistSection?.some(
					(section) => section._ref === activeSection._id
				)
		  )
		: []

	// if (!activeSection) return notFound()
	if (!artist || !activeProjects || !activeSection) return notFound()

	return (
		<ArtistPage
			{...{
				artist,
				projects: activeProjects,
				sectionSlug: sectionSlug,
				artistSections: orderedArtistLinks,
			}}
		/>
	)
}
