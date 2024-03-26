import { ArtistsPage } from "@/components/pages"
import { getArtists } from "@/sanity/sanity-queries"
import { notFound } from "next/navigation"

export default async function Page() {
	const artists = await getArtists()

	if (!artists) return notFound()

	return <ArtistsPage artists={artists} />
}
