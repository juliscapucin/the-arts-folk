import { ArtistsPage } from "@/components/pages"
import { getArtists, getCategories, getPage } from "@/sanity/sanity-queries"
import { notFound } from "next/navigation"

import { metadataFallback } from "@/utils"
import { Suspense } from "react"

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
	const [artists, categories] = await Promise.all([
		getArtists(),
		getCategories(),
	])

	if (!artists || !categories) return notFound()

	const filteredArtists = artists.filter(
		(artist) => artist.name !== "The Arts Folk"
	)

	return (
		<Suspense fallback={<div>...</div>}>
			<ArtistsPage artists={filteredArtists} categories={categories} />
		</Suspense>
	)
}
