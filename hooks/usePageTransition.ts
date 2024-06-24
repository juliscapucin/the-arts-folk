import { useRouter } from "next/navigation"

import gsap from "gsap"
import { useLayoutEffect, useRef } from "react"

export const usePageTransition = (pageTransitionRef: HTMLDivElement) => {
	const router = useRouter()
	let ctx = gsap.context(() => {})

	// On page Exit
	const transitionOnClick = (link: any) => {
		ctx.add(() => {
			gsap.set(pageTransitionRef, { yPercent: -100 })

			gsap.to(pageTransitionRef, {
				yPercent: 0,
				duration: 0.3,
				ease: "linear",
				onComplete: () => {
					router.push(`/${link.slug}`)
				},
			})
		})
	}

	// On page Enter
	useLayoutEffect(() => {
		if (!pageTransitionRef) return

		// gsap.set(pageTransitionRef, { yPercent: 0 })

		ctx.add(() => {
			gsap.to(pageTransitionRef, {
				yPercent: 100,
				duration: 0.4,
				ease: "linear",
			})
		})
	}, [])
}
