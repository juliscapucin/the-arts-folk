import { getArtists, getProjects } from "@/sanity/sanity-queries"
import News from "@/components/news"
// export const revalidate = 3600

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic"

export default async function NewsServer() {
	const artists = await getArtists()
	const projects = await getProjects()
	const news = projects.filter((project) => project.isNews)

	news.forEach((project) => {
		const artist = artists.find((artist) => artist._id === project.artist._ref)
		if (artist) {
			project.artistInfo = artist
		}
	})

	return <News news={news} />
}
