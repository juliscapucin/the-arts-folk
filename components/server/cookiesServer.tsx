import { getPage } from "@/sanity/sanity-queries"
export const revalidate = 3600

import { Cookies } from "@/components/ui"

export default async function CookiesServer() {
	const cookieData = await getPage("terms-and-privacy")

	return <Cookies cookieData={cookieData} />
}
