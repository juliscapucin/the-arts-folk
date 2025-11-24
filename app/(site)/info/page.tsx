import { notFound } from 'next/navigation'

import { InfoPage } from '@/components/pages'
import { getInfoPage } from '@/sanity/sanity-queries'

import { metadataFallback } from '@/utils'
import { Suspense } from 'react'

export async function generateMetadata() {
	const pageData = getInfoPage()
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
	const infoData = await getInfoPage()

	if (!infoData) return notFound()

	return (
		<Suspense fallback={null}>
			<InfoPage infoData={infoData} />
		</Suspense>
	)
}
