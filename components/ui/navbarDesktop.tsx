"use client"

import { useLayoutEffect, useRef, useState } from "react"
import { usePathname, useRouter } from "next/navigation"

import gsap from "gsap"

import { NavbarLink } from "@/components/ui"
import { PageTransition } from "@/components"

import type { NavLink } from "@/types"

type NavbarDesktopProps = {
	navLinks: NavLink[]
}

export default function NavbarDesktop({ navLinks }: NavbarDesktopProps) {
	const pathname = usePathname()
	const router = useRouter()
	const pageTransitionRef = useRef(null)
	let ctx = gsap.context(() => {})

	const transitionOnClick = (link: any) => {
		ctx.add(() => {
			gsap.set(pageTransitionRef.current, { opacity: 1, yPercent: 100 })

			gsap.to(pageTransitionRef.current, {
				yPercent: 0,
				duration: 0.5,
				ease: "power4.inOut",
				onComplete: () => {
					router.push(`/${link.slug}`)
				},
			})
		})
	}

	useLayoutEffect(() => {
		if (!pageTransitionRef.current) return

		ctx.add(() => {
			gsap.to(pageTransitionRef.current, { opacity: 0, duration: 1.5 })
		})
	}, [pathname])

	return (
		<>
			<PageTransition ref={pageTransitionRef} />
			{navLinks && (
				<div className={"hidden lg:flex"}>
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
