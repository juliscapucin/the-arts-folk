"use client"

import { useLayoutEffect, useState } from "react"
import { usePathname } from "next/navigation"

import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

import { usePageContext } from "@/context"

import { ButtonLogo } from "@/components/buttons"
import { NavbarLink } from "@/components/ui"

import type { NavLink } from "@/types"

type NavbarDesktopProps = {
	navLinks: NavLink[]
}

export default function NavbarDesktop({ navLinks }: NavbarDesktopProps) {
	const pathname = usePathname()
	const { transitionOnClick } = usePageContext()
	const [isScrolled, setIsScrolled] = useState(false)

	useLayoutEffect(() => {
		if (typeof window === "undefined") return
		gsap.registerPlugin(ScrollTrigger)

		let ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: "body",
				start: () => "top top-=" + window.innerHeight,
				end: "bottom bottom",
				// markers: true,
				onEnter: () => {
					console.log("enter")
				},
				onLeaveBack: () => {
					console.log("onLeaveBack")
				},
			})
		})

		return () => ctx.revert()
	}, [])

	return (
		<div className='w-full h-full max-w-desktop mx-auto px-[--margin-mobile] lg:px-[--margin-desktop] flex justify-between items-end'>
			<ButtonLogo
				handleClick={() =>
					transitionOnClick({ slug: "/", title: "Home", order: 1 })
				}
			/>
			{navLinks && (
				<div className='hidden lg:flex z-150'>
					{/* Menu links */}
					<nav className='w-full h-full hidden lg:flex justify-end items-center gap-24 mb-3'>
						{navLinks.map((link) => {
							return (
								link.slug && (
									<NavbarLink
										key={link.slug}
										link={link}
										isActive={pathname === `/${link.slug}` ? true : false}
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
