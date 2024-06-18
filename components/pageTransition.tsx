"use client"

import gsap from "gsap"

import { usePathname } from "next/navigation"
import { usePageContext } from "@/context"
import { useLayoutEffect } from "react"
import path from "path"

export const PageTransition = () => {
	const pathname = usePathname()
	const { pageTransitionRef } = usePageContext()
	let ctx = gsap.context(() => {})

	// On page Enter
	useLayoutEffect(() => {
		console.log("enter", pageTransitionRef.current)
		if (!pageTransitionRef.current) return

		// gsap.set(pageTransitionRef, { yPercent: 0 })

		ctx.add(() => {
			gsap.to(pageTransitionRef.current, {
				yPercent: 100,
				duration: 0.4,
				ease: "linear",
			})
		})
	}, [pathname])

	return (
		<div
			ref={pageTransitionRef}
			className='fixed top-0 left-0 w-screen h-screen min-h-svh z-150 pointer-events-none bg-primary'
		></div>
	)
}
