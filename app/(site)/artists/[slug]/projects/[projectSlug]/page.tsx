import { notFound } from "next/navigation"
import { ProjectPage } from "@/components/pages"
import { getArtist, getPage, getProject } from "@/sanity/sanity-queries"
import { metadataFallback } from "@/utils"
import { Suspense } from "react"

export async function generateMetadata({
	params,
}: {
	params: { projectSlug: string; slug: string }
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
// export const dynamic = "force-dynamic"

export default async function page({
	params,
}: {
	params: { projectSlug: string; slug: string }
}) {
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
