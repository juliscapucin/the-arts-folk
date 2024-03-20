"use client"

import { NavbarDesktop, NavbarMobile } from "@/components/ui"
import { ButtonLogo } from "@/components/buttons"

const NavLinks = [
	{ label: "Artists", slug: "artists" },
	{ label: "Info", slug: "info" },
]

export default function Header() {
	return (
		<header className='w-full flex justify-between items-end'>
			<ButtonLogo />
			<NavbarDesktop navLinks={NavLinks} />
			<NavbarMobile navLinks={NavLinks} />
		</header>
	)
}
