import { notFound } from "next/navigation"

import { NewsPage } from "@/components/pages"
import { getArtists, getPage, getProject } from "@/sanity/sanity-queries"

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
	const news = await getProject(slug)
	const artists = await getArtists()

	const artist = artists.find((artist) => artist._id === news.artist._ref)

	if (!news || !artist) return notFound()

	return <NewsPage {...{ news, artist }} />
}
