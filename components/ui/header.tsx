"use client"

import { NavbarDesktop, NavbarMobile } from "@/components/ui"
import { NavLink } from "@/types"

type HeaderProps = {
	navLinks: NavLink[]
}

export default function Header({ navLinks }: HeaderProps) {
	return (
		<header className='fixed top-0 left-0 right-0 bg-primary pt-2 flex justify-between items-end h-[--header-height-mobile] lg:h-[--header-height-desktop] z-header'>
			<NavbarDesktop {...{ navLinks }} />
			<NavbarMobile navLinks={navLinks} />
		</header>
	)
}
