import { notFound } from 'next/navigation'

import { DefaultPage } from '@/components/pages'
import { getPage } from '@/sanity/sanity-queries'

import { ProjectsGalleryServer } from '@/components/server'
import { metadataFallback } from '@/utils'

export async function generateMetadata(props: {
	params: Promise<{ slug: string }>
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
	params: Promise<{ slug: string }>
}) {
	const params = await props.params
	const { slug } = params
	const pageData = await getPage(slug)

	if (!pageData) return notFound()

	return (
		<DefaultPage {...{ pageData }}>
			{pageData.addProjectsGallery && <ProjectsGalleryServer {...{ slug }} />}
		</DefaultPage>
	)
}
