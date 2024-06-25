import { notFound } from "next/navigation"

import { ArtistPage } from "@/components/pages"
import { getArtist, getPage, getProjects } from "@/sanity/sanity-queries"

import { metadataFallback } from "@/utils"

export async function generateMetadata({
	params,
}: {
	params: { slug: string }
}) {
	const { slug } = params
	const pageData = getPage(slug)
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

export default async function page({ params }: { params: { slug: string } }) {
	const { slug } = params
	const projects = await getProjects()
	const artist = await getArtist(slug)

	const artistProjects = projects.filter((project) => {
		return artist._id === project.artist._ref ? project : null
	})

	if (!artistProjects || !artist) return notFound()

	return <ArtistPage {...{ artist, artistProjects }} />
}
