import { notFound } from "next/navigation"
import { ArtistPage } from "@/components/pages"
import {
	getArtist,
	getArtistSections,
	getPage,
	getProjectsByArtist,
} from "@/sanity/sanity-queries"
import { metadataFallback } from "@/utils"
import { Suspense } from "react"

export async function generateMetadata({
	params,
}: {
	params: { slug: string }
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

export default async function page({ params }: { params: { slug: string } }) {
	const { slug } = params
	const artist = await getArtist(slug)
	const projects = await getProjectsByArtist(artist._id)
	const artistSections = await getArtistSections()
	const featuredSection = artistSections.find(
		(section) => section.title === "Featured"
	)

	const artistProjects = projects.filter((project) => {
		if (!project.artist) return null
		return artist._id === project.artist._ref
	})

	if (!artistProjects) return notFound()

	const artistLinks = artistProjects.reduce<string[]>((acc, project) => {
		if (project.artistSection) {
			project.artistSection.forEach((section) => {
				artistSections.forEach((artistSection) => {
					if (
						artistSection._id === section._ref &&
						!acc.includes(artistSection.title)
					) {
						acc.push(artistSection.title)
					}
				})
			})
		}
		return acc
	}, [])

	const featuredProjects = featuredSection
		? artistProjects.filter((project) =>
				project.artistSection?.some(
					(section) => section._ref === featuredSection._id
				)
		  )
		: []

	if (!featuredSection) return notFound()
	// if (!artist || !featuredProjects || !featuredSection) return notFound()

	return (
		<Suspense fallback={null}>
			<ArtistPage
				{...{
					artist,
					projects: featuredProjects,
					sectionSlug: featuredSection.title,
					artistSections: artistLinks,
				}}
			/>
		</Suspense>
	)
}
