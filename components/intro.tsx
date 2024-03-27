"use client"

import { useLayoutEffect, useRef } from "react"

import gsap from "gsap"
import { Flip } from "gsap/Flip"

import { Logo } from "@/components/svgs"

export default function Intro() {
	const logoRef = useRef<SVGSVGElement | null>(null)
	const headerRef = useRef<HTMLDivElement | null>(null)
	const bgRef = useRef<HTMLDivElement | null>(null)
	const containerRef = useRef<HTMLDivElement | null>(null)

	useLayoutEffect(() => {
		const logoElement = logoRef.current
		if (!logoElement || !headerRef.current) return

		gsap.registerPlugin(Flip)

		let ctx = gsap.context(() => {
			gsap.set("path", { autoAlpha: 0 })
			gsap.set(logoElement, { scale: 2 })

			gsap.to("path", {
				autoAlpha: 1,
				stagger: 0.05,
				duration: 0.5,
				ease: "power4.in",
				onComplete: () => {
					const state = Flip.getState(logoElement) // Capture the first state (F)
					headerRef.current?.appendChild(logoElement)

					gsap.set(logoElement, { scale: 0.75 })

					// Use Flip.from to animate from the first state to the last state
					Flip.from(state, {
						scale: true,
						duration: 0.3,
						ease: "power4.in",
						absolute: true,
						delay: 0.3,
						onComplete: () => {
							gsap.to(bgRef.current, {
								yPercent: -100,
								duration: 0.5,
								ease: "power4.inOut",
								onComplete: () => {
									containerRef.current?.remove()
								},
							})
						},
					})
				},
			})
		}, logoElement)

		return () => {
			ctx.revert()
		}
	}, [])

	return (
		<div ref={containerRef} className='fixed w-screen h-svh z-intro'>
			<div ref={bgRef} className='fixed w-screen h-svh z-intro bg-white'></div>
			<div className='fixed top-0 left-0 w-screen h-svh flex justify-center items-center z-intro'>
				<Logo classes='' ref={logoRef} animate={true} />
			</div>
			<div
				ref={headerRef}
				className='fixed top-0 -left-4 pt-2 flex justify-start items-end w-screen h-[--header-height-mobile] lg:h-[--header-height-desktop] z-intro'
			></div>
		</div>
	)
}
