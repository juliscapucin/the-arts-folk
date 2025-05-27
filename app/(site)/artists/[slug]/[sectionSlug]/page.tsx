import { ArtistPage } from '@/components/pages'
import {
	getArtist,
	getArtistSections,
	getPage,
	getProjects,
} from '@/sanity/sanity-queries'
import { ArtistSection } from '@/types'
import { metadataFallback } from '@/utils'
import { notFound } from 'next/navigation'

export async function generateMetadata(props: {
	params: Promise<{ sectionSlug: string; slug: string }>
}) {
	const params = await props.params
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

export default async function page(props: {
	params: Promise<{ sectionSlug: string; slug: string }>
}) {
	const params = await props.params
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
				startView:
					sectionSlug === 'featured' && artist.startView
						? 'gallery'
						: 'thumbnail',
			}}
		/>
	)
}
