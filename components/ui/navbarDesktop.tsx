"use client"

import { usePageContext } from "@/context"

import { ButtonLogo } from "@/components/buttons"
import { NavbarLink } from "@/components/ui"

import type { NavLink } from "@/types"
import { usePathname } from "next/navigation"

type NavbarDesktopProps = {
	navLinks: NavLink[]
}

export default function NavbarDesktop({ navLinks }: NavbarDesktopProps) {
	const pathname = usePathname()
	const { transitionOnClick } = usePageContext()

	return (
		<div className='w-full h-[--header-height-desktop] max-w-desktop mx-auto flex justify-between items-end'>
			<ButtonLogo
				handleClick={() =>
					transitionOnClick({ slug: "/", title: "Home", order: 1 })
				}
			/>
			{navLinks && (
				<div className='hidden lg:flex z-150'>
					{/* Menu links */}
					<nav className='w-full h-full hidden lg:flex justify-end items-center gap-24'>
						{navLinks.map((link) => {
							return (
								link.slug && (
									<NavbarLink
										key={link.slug}
										link={link}
										isActive={pathname.includes(`/${link.slug}`) ? true : false}
										transitionOnClick={transitionOnClick}
									/>
								)
							)
						})}
					</nav>
				</div>
			)}
		</div>
	)
}
