"use client"

import { useLayoutEffect, forwardRef } from "react"
import { usePathname } from "next/navigation"

import gsap from "gsap"

type PageTransitionProps = {
	exit?: boolean
}

export const PageTransition = forwardRef(function PageTransition(
	{ exit }: PageTransitionProps,
	ref?: React.Ref<HTMLDivElement>
) {
	return (
		<div
			ref={ref}
			className='absolute top-0 left-0 bg-primary w-screen h-svh z-100 pointer-events-none'
		>
			<div className='w-screen h-svh bg-faded-5'></div>
		</div>
	)
})
