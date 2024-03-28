import { notFound } from "next/navigation"

import { InfoPage } from "@/components/pages"
import { getInfoPage } from "@/sanity/sanity-queries"

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic"

export default async function Page() {
	const infoData = await getInfoPage()

	if (!infoData) return notFound()

	return <InfoPage infoData={infoData} />
}
