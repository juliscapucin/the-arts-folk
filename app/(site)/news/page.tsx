import { NewsPage } from "@/components/pages"
import { getProjects, getPage } from "@/sanity/sanity-queries"
import { notFound } from "next/navigation"

import { metadataFallback } from "@/utils"

export async function generateMetadata() {
	const pageData = getPage("news")
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

export default async function Page() {
	const projects = await getProjects()
	const news = projects.find((project) => project.isNews)

	if (!news) return notFound()

	return notFound()
}
