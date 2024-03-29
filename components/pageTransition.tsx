"use client"

import { forwardRef } from "react"

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
			className='absolute top-0 left-0 bg-white w-screen h-svh z-100 pointer-events-none'
		></div>
	)
})
