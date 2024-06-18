"use client"

import gsap from "gsap"

import { usePageContext } from "@/context"
import { useLayoutEffect } from "react"

type PageTransitionProps = {
	exit?: boolean
}

export const PageTransition = ({ exit }: PageTransitionProps) => {
	const { pageTransitionRef } = usePageContext()
	let ctx = gsap.context(() => {})

	// On page Enter
	useLayoutEffect(() => {
		if (!pageTransitionRef) return

		// gsap.set(pageTransitionRef, { yPercent: 0 })

		ctx.add(() => {
			gsap.to(pageTransitionRef.current, {
				yPercent: 100,
				duration: 0.4,
				ease: "linear",
			})
		})
	}, [])

	return (
		<div
			ref={pageTransitionRef}
			className='fixed top-0 left-0 w-screen h-screen min-h-svh z-150 pointer-events-none bg-primary'
		></div>
	)
}
