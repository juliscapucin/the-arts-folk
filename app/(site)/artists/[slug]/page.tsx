import { ArtistPage } from '@/components/pages'
import {
	getArtist,
	getArtistSections,
	getPage,
	getProjectsByArtist,
} from '@/sanity/sanity-queries'
import { metadataFallback } from '@/utils'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

type Params = { slug: string }

export async function generateMetadata({ params }: { params: Params }) {
	const { slug } = params
	const page = await getPage(slug)
	if (!page) return metadataFallback

	return {
		metadataBase: metadataFallback.metadataBase,
		title: page.metadataTitle || metadataFallback.title,
		description: page.metadataDescription || metadataFallback.description,
		keywords: page.metadataKeywords || metadataFallback.keywords,
	}
}

export default async function Page({ params }: { params: Params }) {
	const { slug } = params
	const artist = await getArtist(slug)
	if (!artist) return notFound()

	const projects = await getProjectsByArtist(artist._id)
	const artistSections = await getArtistSections()
	const featuredSection = artistSections.find(
		(section) => section.title === 'Featured'
	)
	if (!featuredSection) return notFound()

	const artistProjects = projects.filter(
		(project) => project.artist && artist._id === project.artist._ref
	)
	if (!artistProjects.length) return notFound()

	// Collect unique section IDs from artistProjects
	const sectionIds = new Set<string>()
	artistProjects.forEach((project) => {
		project.artistSection?.forEach((section) => sectionIds.add(section._ref))
	})
	const artistLinks = artistSections.filter((section) =>
		sectionIds.has(section._id)
	)
	const orderedArtistLinks = [...artistLinks].sort((a, b) => a.order - b.order)

	const featuredProjects = artistProjects.filter((project) =>
		project.artistSection?.some(
			(section) => section._ref === featuredSection._id
		)
	)

	return (
		<Suspense fallback={null}>
			<ArtistPage
				artist={artist}
				projects={featuredProjects}
				sectionSlug={featuredSection.title}
				artistSections={orderedArtistLinks}
				startView={artist.startView ? 'gallery' : 'thumbnail'}
			/>
		</Suspense>
	)
}
