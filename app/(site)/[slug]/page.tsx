import { notFound } from "next/navigation"

import { DefaultPage } from "@/components/pages"
import { getPage } from "@/sanity/sanity-queries"

import { metadataFallback } from "@/utils"
import { Suspense } from "react"
import { ProjectsGalleryServer } from "@/components/server"

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
	const pageData = await getPage(slug)

	if (!pageData) return notFound()

	return (
		<Suspense fallback={null}>
			<DefaultPage {...{ pageData }}>
				{pageData.addProjectsGallery && <ProjectsGalleryServer {...{ slug }} />}
			</DefaultPage>
		</Suspense>
	)
}
