"use client"

import { usePathname, useRouter } from "next/navigation"
import { NavbarLink } from "@/components/ui"

import type { NavLink } from "@/types"

type NavbarDesktopProps = {
	navLinks: NavLink[]
}

export default function NavbarDesktop({ navLinks }: NavbarDesktopProps) {
	const pathname = usePathname()
	const router = useRouter()

	const transitionOnClick = (link: any) => {
		router.push(`/${link.slug}`)
	}

	return (
		<>
			{navLinks && (
				<div className={"hidden lg:flex"}>
					{/* Menu links */}
					<nav className='w-full h-full hidden lg:flex justify-end items-center gap-24'>
						{navLinks.map((link) => {
							return (
								<NavbarLink
									key={link.slug}
									link={link}
									isActive={pathname.includes(`/${link.slug}`) ? true : false}
									transitionOnClick={transitionOnClick}
								/>
							)
						})}
					</nav>
				</div>
			)}
		</>
	)
}
