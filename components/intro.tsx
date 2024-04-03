"use client"

import { useLayoutEffect, useRef } from "react"
import { usePathname } from "next/navigation"

import gsap from "gsap"
import { Flip } from "gsap/Flip"

import { Logo } from "@/components/svgs"
import { GSAPQueries } from "@/utils"

export default function Intro() {
	const pathname = usePathname()

	// if (pathname !== "/") return null

	const containerRef = useRef<HTMLDivElement | null>(null)

	useLayoutEffect(() => {
		const containerElement = containerRef.current
		if (!containerElement) return

		gsap.registerPlugin(Flip)

		let mm = gsap.matchMedia()

		mm.add(
			GSAPQueries,
			(context) => {
				let isMobile = context.conditions?.isMobile ?? false

				gsap.set("path", { autoAlpha: 0 })
				gsap.set(".gsap-logo", { scale: isMobile ? 1 : 2 })

				let tl = gsap.timeline()

				tl.to("path", {
					autoAlpha: 1,
					stagger: 0.08,
					duration: 0.8,
					ease: "power4.in",
					onComplete: () => {
						pathname !== "/" &&
							gsap.to("path", {
								autoAlpha: 0,
								stagger: 0.03,
								duration: 0.3,
								ease: "power4.in",
							})
					},
				}).to(".gsap-bg", {
					yPercent: -100,
					duration: 0.8,
					delay: 0.5,
					ease: "power4.inOut",
					onComplete: () => {
						containerElement.remove()
					},
				})
			},
			containerElement
		)

		return () => {
			mm.revert()
		}
	}, [])

	return (
		<div
			ref={containerRef}
			className='fixed w-screen h-svh z-intro pointer-events-none'
		>
			<div className='gsap-bg fixed w-screen h-svh z-intro bg-white'></div>
			<div className='gsap-logo-container fixed top-0 left-0 w-screen h-svh flex justify-center items-center z-intro'>
				<Logo classes='gsap-logo' animate={true} />
			</div>
			<div className='gsap-header fixed top-0 left-4 lg:left-8 pt-2 flex justify-start items-end w-screen max-w-desktop h-[--header-height-mobile] lg:h-[--header-height-desktop] z-intro'></div>
		</div>
	)
}
