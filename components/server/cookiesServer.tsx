import { getPage } from "@/sanity/sanity-queries"
// export const revalidate = 3600

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic"

import { Cookies } from "@/components/ui"

export default async function CookiesServer() {
	const cookieData = await getPage("terms-and-privacy")

	return <Cookies cookieData={cookieData} />
}
