"use client"

import { useLayoutEffect, useRef } from "react"
import { usePathname } from "next/navigation"

import gsap from "gsap"
import { Flip } from "gsap/Flip"

import { Logo } from "@/components/svgs"

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
			{ isMobile: "(max-width: 800px)", isDesktop: "(min-width: 801px)" },
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
				}).to(".gsap-bg", {
					yPercent: -100,
					duration: 0.5,
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

	// useLayoutEffect(() => {
	// 	const logoElement = logoRef.current
	// 	if (!logoElement || !headerRef.current) return

	// 	gsap.registerPlugin(Flip)

	// 	let mm = gsap.matchMedia()

	// 	mm.add(
	// 		{ isMobile: "(max-width: 800px)", isDesktop: "(min-width: 801px)" },
	// 		(context) => {
	// 			let isMobile = context.conditions?.isMobile ?? false

	// 			gsap.set("path", { autoAlpha: 0 })
	// 			gsap.set(logoElement, { scale: isMobile ? 1 : 2 })

	// 			gsap.to("path", {
	// 				autoAlpha: 1,
	// 				stagger: 0.05,
	// 				duration: 0.5,
	// 				ease: "power4.in",
	// 				onComplete: () => {
	// 					const state = Flip.getState(logoElement) // Capture the first state (F)
	// 					headerRef.current?.appendChild(logoElement)

	// 					gsap.set(logoElement, {
	// 						scale: isMobile ? 0.5 : 0.75,
	// 						transformOrigin: "left",
	// 					})

	// 					// Use Flip.from to animate from the first state to the last state
	// 					Flip.from(state, {
	// 						scale: true,
	// 						duration: 0.3,
	// 						ease: "power4.Out",
	// 						absolute: true,
	// 						delay: 0.3,
	// 						onComplete: () => {
	// 							gsap.to(bgRef.current, {
	// 								yPercent: -100,
	// 								duration: 0.5,
	// 								ease: "power4.inOut",
	// 								onComplete: () => {
	// 									containerRef.current?.remove()
	// 								},
	// 							})
	// 						},
	// 					})
	// 				},
	// 			})
	// 		},
	// 		logoElement
	// 	)

	// 	return () => {
	// 		mm.revert()
	// 	}
	// }, [])

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
