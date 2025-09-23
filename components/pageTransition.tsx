'use client'

import { useRef } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'

import { usePageContext } from '@/context'

export const PageTransition = () => {
	const pathname = usePathname()
	const router = useRouter()

	const pageTransitionRef = useRef<HTMLDivElement | null>(null)
	const { transitionIndex, isTransitioning, link, handleTransitionEnd } =
		usePageContext()

	// On page Exit
	useGSAP(() => {
		if (!pageTransitionRef.current || !isTransitioning) return

		gsap.set(pageTransitionRef.current, { yPercent: -100 })

		gsap.to(pageTransitionRef.current, {
			yPercent: 0,
			duration: 0.4,
			ease: 'linear',
			onComplete: () => {
				link === 'back'
					? router.back()
					: link
						? router.push(
								typeof link === 'object' && 'slug' in link && link.slug
									? `/${link.slug}`
									: `/${link}`
							)
						: undefined
				handleTransitionEnd()
			},
		})
	}, [isTransitioning])

	// On page Enter
	useGSAP(() => {
		if (!pageTransitionRef || !pageTransitionRef?.current) return

		gsap.to(pageTransitionRef.current, {
			yPercent: 100,
			duration: 0.8,
			ease: 'linear',
		})
	}, [pathname, pageTransitionRef])

	return (
		<div
			ref={pageTransitionRef}
			className={`fixed top-0 left-0 w-screen h-screen min-h-svh pointer-events-none bg-primary ${transitionIndex}`}></div>
	)
}
