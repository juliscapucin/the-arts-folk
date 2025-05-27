import { getPage } from '@/sanity/sanity-queries'

import { NewsServer } from '@/components/server'
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
	return (
		<main>
			<NewsServer />
		</main>
	)
}
