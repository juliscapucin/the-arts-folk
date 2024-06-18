"use client"

import { NavbarDesktop, NavbarMobile } from "@/components/ui"
import { NavLink } from "@/types"

type HeaderProps = {
	navLinks: NavLink[]
}

export default function Header({ navLinks }: HeaderProps) {
	return (
		<>
			<header className='max-w-screen pt-2 mx-[--margin-mobile] lg:mx-[--margin-desktop] flex justify-between items-end h-[--header-height-mobile] lg:h-[--header-height-desktop] bg-white z-100'>
				<NavbarDesktop {...{ navLinks }} />
				<NavbarMobile navLinks={navLinks} />
			</header>
		</>
	)
}
