'use client'

import React, { useLayoutEffect, useRef } from 'react'
import { gsap } from 'gsap'

type Props = {
	isHovering: boolean
	isActive?: boolean
	variant: string
	label: string
}

const CustomCursor = ({
	isHovering,
	isActive,
	variant,
	label: projectTitle,
}: Props) => {
	const refCursor = useRef<HTMLDivElement | null>(null)

	useLayoutEffect(() => {
		const cursorDiv = refCursor.current
		if (!cursorDiv) return

		gsap.set(cursorDiv, { xPercent: -50, yPercent: -50 })

		let xTo = gsap.quickTo(cursorDiv, 'x', { duration: 0.6, ease: 'power3' }),
			yTo = gsap.quickTo(cursorDiv, 'y', { duration: 0.6, ease: 'power3' })

		window.addEventListener('mousemove', (e) => {
			xTo(e.clientX)
			yTo(e.clientY)
		})

		return () => {
			window.removeEventListener('mousemove', (e) => {
				gsap.set(cursorDiv, { xPercent: -50, yPercent: -50 })

				let xTo = gsap.quickTo(cursorDiv, 'x', {
						duration: 0.6,
						ease: 'power3',
					}),
					yTo = gsap.quickTo(cursorDiv, 'y', { duration: 0.6, ease: 'power3' })

				window.addEventListener('mousemove', (e) => {
					xTo(e.clientX)
					yTo(e.clientY)
				})
			})
		}
	}, [variant]) // Only re-run if `variant` changes

	return (
		<div
			className={`${
				isActive && isHovering ? 'opacity-100' : 'opacity-0'
			} fixed top-0 left-0 z-artist-aside pointer-events-none cursor-pointer transition-opacity duration-300`}
			ref={refCursor}>
			<span className='block py-1 px-2 w-fit bg-secondary text-primary text-labelMedium font-medium text-nowrap font-text text-center leading-tightest z-30'>
				{projectTitle}
			</span>
		</div>
	)
}

export default React.memo(CustomCursor)
