"use client"

import { useEffect, useState } from "react"
import { NavbarDesktop, NavbarMobile } from "@/components/ui"
import { NavLink } from "@/types"

type HeaderProps = {
	navLinks: NavLink[]
}

export default function Header({ navLinks }: HeaderProps) {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
	const [logoClass, setLogoClass] = useState<string>("z-header")

	const delayLogoClass = (newClass: string, delay: number) => {
		setTimeout(() => {
			setLogoClass(newClass)
		}, delay)
	}

	useEffect(() => {
		isMobileMenuOpen
			? delayLogoClass("z-mobileMenu", 100)
			: delayLogoClass("z-header", 300)
	}, [isMobileMenuOpen])

	return (
		<header
			className={`header fixed top-0 left-0 right-0 bg-primary pt-2 flex justify-between items-end h-[--header-height-mobile] lg:h-[--header-height-desktop] ${logoClass}`}
		>
			<NavbarDesktop {...{ navLinks }} />
			<NavbarMobile {...{ navLinks, isMobileMenuOpen, setIsMobileMenuOpen }} />
		</header>
	)
}
