import { notFound } from "next/navigation"

import { InfoPage } from "@/components/pages"
import { getInfoPage } from "@/sanity/sanity-queries"

export default async function Page() {
	const infoData = await getInfoPage()

	if (!infoData) return notFound()

	return <InfoPage {...{ infoData }} />
}
