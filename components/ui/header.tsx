"use client"

import { NavbarDesktop, NavbarMobile } from "@/components/ui"
import { ButtonLogo } from "@/components/buttons"
import type { NavLink } from "@/types"

type HeaderProps = {
	navLinks: NavLink[]
}

export default function Header({ navLinks }: HeaderProps) {
	return (
		<header className='w-full pt-2 px-5 lg:px-8 flex justify-between items-end h-[--header-height-mobile] lg:h-[--header-height-desktop] bg-white'>
			<ButtonLogo />
			<NavbarDesktop navLinks={navLinks} />
			<NavbarMobile navLinks={navLinks} />
		</header>
	)
}
