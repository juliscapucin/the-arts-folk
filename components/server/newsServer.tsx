import { Suspense } from 'react'
import { notFound } from 'next/navigation'

import { getNews } from '@/sanity/sanity-queries'
import { News } from '@/components'

export default async function NewsServer() {
	const news = await getNews()

	if (!news) return notFound()

	return (
		<Suspense fallback={<div>...</div>}>
			<News news={news} />
		</Suspense>
	)
}
