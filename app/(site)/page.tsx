import { notFound } from "next/navigation"

import { HomePage } from "@/components/pages"
import { getPage, getShowreel } from "@/sanity/sanity-queries"
import { metadataFallback } from "@/utils"
import { Suspense } from "react"

import { NewsServer } from "@/components/server"

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic"

// export const revalidate = 300

export async function generateMetadata() {
	const pageData = getPage("home")
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

const Spinner = () => {
	return (
		<div className='relative w-[10%] min-w-12 max-w-[50px] aspect-square animate-spin'>
			<div className='absolute w-full h-full top-0 left-0 rounded-full border border-faded-5 border-r-secondary z-10'></div>
			<div className='absolute w-full h-full top-0 left-0 rounded-full border border-faded-30 opacity-20'></div>
		</div>
	)
}

export default async function Home() {
	const showreelImages = await getShowreel()

	if (!showreelImages) return notFound()

	return (
		<Suspense fallback={<Spinner />}>
			<HomePage showreelImages={showreelImages}>
				<NewsServer />
			</HomePage>
		</Suspense>
	)
}
