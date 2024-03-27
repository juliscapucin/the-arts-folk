import { notFound } from "next/navigation"

import { DefaultPage } from "@/components/pages"
import { getPage } from "@/sanity/sanity-queries"

export default async function page({ params }: { params: { slug: string } }) {
	const { slug } = params
	const pageData = await getPage(slug)

	if (!pageData) return notFound()

	return <DefaultPage pageData={pageData} />
}
