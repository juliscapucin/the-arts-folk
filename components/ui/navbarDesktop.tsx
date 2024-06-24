"use client"

import { ButtonLogo } from "@/components/buttons"
import { NavbarLink } from "@/components/ui"

import type { NavLink } from "@/types"
import { usePathname } from "next/navigation"

type NavbarDesktopProps = {
	navLinks: NavLink[]
	transitionOnClick: (link: NavLink) => void
}

export default function NavbarDesktop({
	navLinks,
	transitionOnClick,
}: NavbarDesktopProps) {
	const pathname = usePathname()

	return (
		<>
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
		</>
	)
}
