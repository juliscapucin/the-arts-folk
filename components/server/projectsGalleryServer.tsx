import { Suspense } from "react"
import { notFound } from "next/navigation"

import { getArtists, getProjectsGallery } from "@/sanity/sanity-queries"
import { ProjectsGallery } from "@/components"

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic"

type ProjectsGalleryServerProps = {
	slug: string
}

export default async function ProjectsGalleryServer({
	slug,
}: ProjectsGalleryServerProps) {
	// Fetch artists and news in parallel
	const [artists, projectsGallery] = await Promise.all([
		getArtists(),
		getProjectsGallery(slug),
	])

	if (!projectsGallery || !artists) return notFound()

	console.log(projectsGallery)

	// Create a Map for fast lookup of artists by _id
	const artistMap = new Map(artists.map((artist) => [artist._id, artist]))

	// Combine news with artist information
	const projectsGalleryWithArtistInfo = projectsGallery.map((project) => {
		if (project.artist) {
			const artistInfo = artistMap.get(project.artist._ref)
			return { ...project, artistInfo }
		}
		return project
	})

	return (
		<Suspense fallback={<div>...</div>}>
			<ProjectsGallery projectsGallery={projectsGalleryWithArtistInfo} />
		</Suspense>
	)
}
