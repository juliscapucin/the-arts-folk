import { Suspense } from "react"
import { notFound } from "next/navigation"

import { getArtists, getNews } from "@/sanity/sanity-queries"
import { News } from "@/components"

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic"

export default async function NewsServer() {
	// Fetch artists and news in parallel
	const [artists, news] = await Promise.all([getArtists(), getNews()])

	if (!news || !artists) return notFound()

	// Create a Map for fast lookup of artists by _id
	const artistMap = new Map(artists.map((artist) => [artist._id, artist]))

	// Combine news with artist information
	const newsWithArtistInfo = news.map((project) => {
		if (project.artist) {
			const artistInfo = artistMap.get(project.artist._ref)
			return { ...project, artistInfo }
		}
		return project
	})

	return (
		<Suspense fallback={<div>...</div>}>
			<News news={newsWithArtistInfo} />
		</Suspense>
	)
}
