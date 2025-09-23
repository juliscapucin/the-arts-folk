import { getPage } from '@/sanity/sanity-queries'
import { redirect } from 'next/navigation'

import { metadataFallback } from '@/utils'

export async function generateMetadata() {
	const pageData = getPage('news')
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

export default async function Page() {
	redirect('/artists')
}
