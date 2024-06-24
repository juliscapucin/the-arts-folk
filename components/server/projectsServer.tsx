import { getArtists } from "@/sanity/sanity-queries"
import { News } from "@/components"
// export const revalidate = 3600

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic"

export default async function ProjectsServer() {
	const artists = await getArtists()

	return null
}
