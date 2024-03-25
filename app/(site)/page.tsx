import { notFound } from "next/navigation"

import { HomePage } from "@/components/pages"
import { getShowreel } from "@/sanity/sanity-queries"

export default async function Home() {
	const showreelImages = await getShowreel()

	if (!showreelImages) return notFound()

	return <HomePage showreelImages={showreelImages} />
}
