import { notFound } from "next/navigation"
import { ArtistPage } from "@/components/pages"
import {
	getArtist,
	getArtistSections,
	getPage,
	getProjects,
} from "@/sanity/sanity-queries"
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
	const artistSections = await getArtistSections()
	const portfolioSection = artistSections.find(
		(section) => section.title === "Portfolio"
	)
	const artist = await getArtist(slug)

	if (!artist) return notFound()

	const artistProjects = projects.filter(
		(project) => artist._id === project.artist._ref
	)

	if (!portfolioSection) return notFound()

	const portfolioProjects = artistProjects.filter((project) =>
		project.artistSection?.some(
			(section) => section._ref === portfolioSection._id
		)
	)

	if (portfolioProjects.length === 0) return notFound()

	return <ArtistPage {...{ artist, projects: portfolioProjects }} />
}
