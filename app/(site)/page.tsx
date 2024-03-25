import { notFound } from "next/navigation"

import { HomePage } from "@/components/pages"
import { getShowreel } from "@/sanity/sanity-queries"

export default async function Home() {
	const infoData = await getShowreel()

	console.log(infoData)

	if (!infoData) return notFound()

	return <HomePage />
}
