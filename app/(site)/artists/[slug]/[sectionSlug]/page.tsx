import { ArtistPage } from '@/components/pages'
import {
	getArtist,
	getArtistSectionData,
	getPage,
} from '@/sanity/sanity-queries'
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
	const artist = await getArtist(slug)
	if (!artist) return notFound()

	const { activeSection, artistSections, activeProjects } =
		await getArtistSectionData(artist._id, sectionSlug)

	if (!activeSection || !activeProjects?.length) return notFound()

	return (
		<ArtistPage
			{...{
				artist,
				projects: activeProjects,
				sectionSlug: sectionSlug,
				artistSections,
				startView:
					sectionSlug === 'featured' && artist.startView
						? 'gallery'
						: 'thumbnail',
			}}
		/>
	)
}
