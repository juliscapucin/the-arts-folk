import { ArtistsPage } from "@/components/pages"
import { getArtists, getCategories, getPage } from "@/sanity/sanity-queries"
import { notFound } from "next/navigation"

import { metadataFallback } from "@/utils"

export async function generateMetadata() {
	const pageData = getPage("artists")
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
	const artists = await getArtists()
	// const categories = await getCategories()

	// console.log(categories)

	// if (!artists || !categories) return notFound()

	const fakeCategories = [{ title: "All", _id: "xxx" }]

	return <ArtistsPage artists={artists} categories={fakeCategories} />
}
