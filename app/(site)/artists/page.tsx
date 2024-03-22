import { ArtistsPage } from "@/components/pages"
import { getArtists } from "@/sanity/sanity-queries"

export default async function Page() {
	const artists = await getArtists()
	return <ArtistsPage artists={artists} />
}
