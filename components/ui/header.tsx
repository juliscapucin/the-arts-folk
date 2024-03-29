import { NavbarDesktop, NavbarMobile } from "@/components/ui"
import type { NavLink } from "@/types"

import { getHeaderNavLinks } from "@/sanity/sanity-queries"

const fallbackNavLinks = [
	{ title: "Artists", slug: "artists", order: 1 },
	{ title: "Info", slug: "info", order: 2 },
]

export default async function Header() {
	let navLinks = await getHeaderNavLinks()

	if (!navLinks || navLinks.length === 0) navLinks = fallbackNavLinks

	return (
		<header className='max-w-screen pt-2 mx-[--margin-mobile] lg:mx-[--margin-desktop] flex justify-between items-end h-[--header-height-mobile] lg:h-[--header-height-desktop] bg-white'>
			<NavbarDesktop navLinks={navLinks} />
			<NavbarMobile navLinks={navLinks} />
		</header>
	)
}
