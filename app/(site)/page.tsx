import { notFound } from 'next/navigation'

import { HomePage } from '@/components/pages'
import { getPage, getShowreel } from '@/sanity/sanity-queries'
import { metadataFallback } from '@/utils'

import { NewsServer } from '@/components/server'

export async function generateMetadata() {
	const pageData = getPage('home')
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

export default async function Home() {
	const showreelImages = await getShowreel()

	if (!showreelImages) return notFound()

	return (
		<HomePage showreelImages={showreelImages}>
			<NewsServer />
		</HomePage>
	)
}
