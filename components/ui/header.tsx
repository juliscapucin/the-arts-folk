"use client"

import { useRouter } from "next/navigation"

import { NavbarDesktop, NavbarMobile } from "@/components/ui"
import { NavLink } from "@/types"

import { usePageContext } from "@/context"

type HeaderProps = {
	navLinks: NavLink[]
}

export default function Header({ navLinks }: HeaderProps) {
	const router = useRouter()
	const { transitionOnClick } = usePageContext()

	return (
		<>
			<header className='max-w-screen pt-2 mx-[--margin-mobile] lg:mx-[--margin-desktop] flex justify-between items-end h-[--header-height-mobile] lg:h-[--header-height-desktop] bg-white z-100'>
				<NavbarDesktop {...{ navLinks, transitionOnClick }} />
				<NavbarMobile navLinks={navLinks} />
			</header>
		</>
	)
}
