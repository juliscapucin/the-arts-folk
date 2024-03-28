import { notFound } from "next/navigation"

import { DefaultPage } from "@/components/pages"
import { getPage } from "@/sanity/sanity-queries"

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic"

export default async function page({ params }: { params: { slug: string } }) {
	const { slug } = params
	const pageData = await getPage(slug)

	if (!pageData) return notFound()

	return <DefaultPage pageData={pageData} />
}
