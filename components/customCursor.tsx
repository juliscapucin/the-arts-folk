"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"

type Props = {
	isHovering: boolean
	variant: string
	projectTitle: string
}

export default function CustomCursor({
	isHovering,
	variant,
	projectTitle,
}: Props) {
	const refCursor = useRef(null)

	useEffect(() => {
		const cursorDiv = refCursor.current as HTMLDivElement | null

		if (!cursorDiv) return

		const moveCursor = (e: MouseEvent) => {
			gsap.to(cursorDiv, {
				x: e.clientX - cursorDiv.clientWidth / 1.5,
				y: e.clientY - cursorDiv.clientHeight / 1.5,
				duration: 0.3,
			})
		}

		window.addEventListener("mousemove", moveCursor)
		return () => {
			window.removeEventListener("mousemove", moveCursor)
		}
	}, [refCursor, variant])

	return (
		<div
			className={`${
				!isHovering && "hidden"
			} fixed top-0 left-0 z-15 pointer-events-none cursor-pointer`}
			ref={refCursor}
		>
			<span className='w-fit bg-secondary text-primary text-labelMedium font-medium text-nowrap font-text text-center leading-tightest z-30'>
				{projectTitle}
			</span>
		</div>
	)
}
