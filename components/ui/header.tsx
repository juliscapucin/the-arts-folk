"use client"

import { NavbarDesktop, NavbarMobile } from "@/components/ui"
import { ButtonLogo } from "@/components/buttons"

const NavLinks = [
	{ label: "Artists", slug: "artists" },
	{ label: "Info", slug: "info" },
]

export default function Header() {
	return (
		<header className='w-full pt-2 px-5 lg:px-8 flex justify-between items-end h-[--header-height-mobile] lg:h-[--header-height-desktop] bg-white'>
			<ButtonLogo />
			<NavbarDesktop navLinks={NavLinks} />
			<NavbarMobile navLinks={NavLinks} />
		</header>
	)
}
