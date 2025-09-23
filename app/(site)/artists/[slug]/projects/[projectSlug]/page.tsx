import { ProjectPage } from '@/components/pages'
import { getArtist, getPage, getProject } from '@/sanity/sanity-queries'
import { metadataFallback } from '@/utils'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

export async function generateMetadata(props: {
	params: Promise<{ projectSlug: string; slug: string }>
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
	params: Promise<{ projectSlug: string; slug: string }>
}) {
	const params = await props.params
	const { projectSlug, slug } = params
	const artist = await getArtist(slug)
	const project = await getProject(projectSlug)

	if (!artist || !project) return notFound()

	return (
		<Suspense fallback={null}>
			<ProjectPage
				{...{
					artist,
					project,
				}}
			/>
		</Suspense>
	)
}
