"use client"

import gsap from "gsap"

import { usePathname } from "next/navigation"
import { usePageContext } from "@/context"
import { useLayoutEffect } from "react"

export const PageTransition = () => {
	const pathname = usePathname()
	const { pageTransitionRef, transitionIndex } = usePageContext()

	// On page Enter
	useLayoutEffect(() => {
		if (!pageTransitionRef.current) return

		gsap.to(pageTransitionRef.current, {
			yPercent: 100,
			duration: 0.8,
			ease: "linear",
		})
	}, [pathname])

	return (
		<div
			ref={pageTransitionRef}
			className={`fixed top-0 left-0 w-screen h-screen min-h-svh pointer-events-none bg-primary ${transitionIndex}`}></div>
	)
}
