import { notFound } from "next/navigation"

import { InfoPage } from "@/components/pages"
import { getInfoPage } from "@/sanity/sanity-queries"

export default async function Page() {
	const info = await getInfoPage()

	if (!info) return notFound()

	return <InfoPage {...{ info }} />
}
