"use server"

import { Header } from "@/components/ui"
import { getHeaderNavLinks } from "@/sanity/sanity-queries"

const fallbackNavLinks = [
	{ title: "Artists", slug: "artists", order: 1 },
	{ title: "Info", slug: "info", order: 2 },
]

export default async function HeaderServer() {
	const navLinks = await getHeaderNavLinks()

	if (!navLinks || navLinks.length === 0)
		return <Header {...{ navLinks: fallbackNavLinks }} />

	return <Header {...{ navLinks }} />
}
