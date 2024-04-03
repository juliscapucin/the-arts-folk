import { notFound } from "next/navigation"

import { HomePage } from "@/components/pages"
import { getShowreel } from "@/sanity/sanity-queries"

// Opt out of caching for all data requests in the route segment
// export const dynamic = "force-dynamic"

export const revalidate = 300

export default async function Home() {
	const showreelImages = await getShowreel()

	if (!showreelImages) return notFound()

	return <HomePage showreelImages={showreelImages} />
}
