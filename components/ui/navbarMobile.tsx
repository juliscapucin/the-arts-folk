"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"

import { ButtonBurger } from "@/components/buttons"

import { NavLink } from "@/types"

type NavLinksProps = {
	navLinks: NavLink[]
}

export default function MenuMobile({ navLinks }: NavLinksProps) {
	const [isOpen, setIsOpen] = useState(false)
	const pathname = usePathname()

	const transitionOnClick = (link: NavLink, el: HTMLElement) => {
		console.log(link)
	}

	const toggleMobileMenu = () => {
		setIsOpen(!isOpen)
	}

	return (
		<>
			{navLinks && (
				<div className='block lg:hidden'>
					<div className='absolute top-4 right-4 flex justify-end items-center z-50'>
						{/* Burger Button */}
						<ButtonBurger action={toggleMobileMenu} isOpen={isOpen} />
					</div>

					{/* Mobile Menu */}
					<aside
						className={`absolute top-0 left-0 w-screen min-h-svh p-8 bg-secondary transition-transform ${
							isOpen ? "" : "-translate-y-full"
						}`}
					>
						{/* Nav Links */}
						<nav className='flex flex-col border-solid border-b border-secondary mt-32 h-full'>
							{navLinks.map((link) => {
								return (
									<div
										className={`relative h-32 flex justify-start items-start`}
										key={link.title}
									>
										{/* Inactive Link */}
										{(pathname === "/" && link.slug === "/") ||
										pathname.includes(`/${link.slug}`) ? (
											<span className='font-headline text-displaySmall text-primary'>
												{link.title}
											</span>
										) : (
											// Active Link
											<button className='block' onClick={toggleMobileMenu}>
												<span className='font-headline text-displaySmall text-primary'>
													{link.title}
												</span>
											</button>
										)}
									</div>
								)
							})}
						</nav>
					</aside>
				</div>
			)}
		</>
	)
}
