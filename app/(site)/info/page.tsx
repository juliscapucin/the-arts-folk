import { notFound } from "next/navigation"

import { InfoPage } from "@/components/pages"
import { getInfoPage } from "@/sanity/sanity-queries"

import { metadataFallback } from "@/utils"

export async function generateMetadata() {
	const pageData = getInfoPage()
	const page = await pageData

	if (!page) {
		return metadataFallback
	}

	return {
		title: page.metadataTitle || metadataFallback.title,
		description: page.metadataDescription || metadataFallback.description,
		keywords: page.metadataKeywords || metadataFallback.keywords,
	}
}

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic"

export default async function Page() {
	const infoData = await getInfoPage()

	if (!infoData) return notFound()

	return <InfoPage infoData={infoData} />
}
