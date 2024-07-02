import { getArtists, getProjects } from "@/sanity/sanity-queries"
import News from "@/components/news"
import { Suspense } from "react"
// export const revalidate = 3600

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic"

export default async function NewsServer() {
	const artists = await getArtists()
	const projects = await getProjects()
	//TODO: implement query for news
	const news = projects.filter((project) => project.isNews)

	news.forEach((project) => {
		const artist = artists.find((artist) => {
			if (!project.artist) return null
			return artist._id === project.artist._ref
		})
		if (artist) {
			project.artistInfo = artist
		}
	})

	return (
		<Suspense fallback={null}>
			<News news={news} />
		</Suspense>
	)
}
