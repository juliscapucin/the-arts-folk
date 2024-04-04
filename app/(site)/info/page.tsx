import { notFound } from "next/navigation"

import { InfoPage } from "@/components/pages"
import { getInfoPage, getPage } from "@/sanity/sanity-queries"

import { MetadataParams } from "@/types"

export async function generateMetadata({ params: { slug } }: MetadataParams) {
	const pageData = getPage(slug)
	const page = await pageData

	if (!page) {
		return {
			title: "The Arts Folk",
			description: "Photographic, Production & Casting Agency",
		}
	}

	return {
		title: page.metadataTitle,
		description: page.metadataDescription,
	}
}

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic"

export default async function Page() {
	const infoData = await getInfoPage()

	if (!infoData) return notFound()

	return <InfoPage infoData={infoData} />
}
