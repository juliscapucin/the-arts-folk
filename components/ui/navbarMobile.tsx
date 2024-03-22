"use client"

import { useState } from "react"
import { usePathname } from "next/navigation"

import { ButtonBurger } from "@/components/buttons"

import { NavLink } from "@/types"

type NavbarMobileProps = {
	navLinks: NavLink[]
}

export default function NavbarMobile({ navLinks }: NavbarMobileProps) {
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
					<div className='absolute top-4 right-4 flex justify-end items-center z-100'>
						{/* Burger Button */}
						<ButtonBurger action={toggleMobileMenu} isOpen={isOpen} />
					</div>

					{/* Mobile Menu */}
					<aside
						className={`absolute top-0 left-0 w-screen min-h-svh p-8 bg-secondary transition-transform z-80 ${
							isOpen ? "" : "-translate-y-full"
						}`}
					>
						{/* Nav Links */}
						<nav className='flex flex-col gap-8 mt-32 h-svh'>
							{navLinks.map((link) => {
								return (
									<div
										className={`relative flex justify-center items-start font-text text-headlineLarge text-primary font-thin`}
										key={link.title}
									>
										{/* Inactive Link */}
										{(pathname === "/" && link.slug === "/") ||
										pathname.includes(`/${link.slug}`) ? (
											<span className='uppercase'>{link.title}</span>
										) : (
											// Active Link
											<button className='block' onClick={toggleMobileMenu}>
												<span className='uppercase'>{link.title}</span>
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
