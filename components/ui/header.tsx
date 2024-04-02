"use client"

import { useLayoutEffect, useRef } from "react"
import { usePathname, useRouter } from "next/navigation"

import gsap from "gsap"

import { PageTransition } from "@/components"
import { NavbarDesktop, NavbarMobile } from "@/components/ui"
import { NavLink } from "@/types"

type HeaderProps = {
	navLinks: NavLink[]
}

export default function Header({ navLinks }: HeaderProps) {
	const pathname = usePathname()
	const router = useRouter()
	const pageTransitionRef = useRef(null)
	let ctx = gsap.context(() => {})

	// On page Exit
	const transitionOnClick = (link: any) => {
		ctx.add(() => {
			gsap.set(pageTransitionRef.current, { yPercent: -100 })

			gsap.to(pageTransitionRef.current, {
				yPercent: 0,
				duration: 0.3,
				ease: "linear",
				onComplete: () => {
					router.push(`/${link.slug}`)
				},
			})
		})
	}

	// On page Enter
	useLayoutEffect(() => {
		if (!pageTransitionRef.current) return

		// gsap.set(pageTransitionRef.current, { yPercent: 0 })

		ctx.add(() => {
			gsap.to(pageTransitionRef.current, {
				yPercent: 100,
				duration: 0.4,
				ease: "linear",
			})
		})
	}, [pathname])

	return (
		<>
			<PageTransition ref={pageTransitionRef} />
			<header className='max-w-screen pt-2 mx-[--margin-mobile] lg:mx-[--margin-desktop] flex justify-between items-end h-[--header-height-mobile] lg:h-[--header-height-desktop] bg-white'>
				<NavbarDesktop {...{ navLinks, transitionOnClick }} />
				<NavbarMobile navLinks={navLinks} />
			</header>
		</>
	)
}
