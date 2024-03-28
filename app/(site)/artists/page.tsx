import { ArtistsPage } from "@/components/pages"
import { getArtists } from "@/sanity/sanity-queries"
import { notFound } from "next/navigation"

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic"

export default async function Page() {
	const artists = await getArtists()

	if (!artists) return notFound()

	return <ArtistsPage artists={artists} />
}
