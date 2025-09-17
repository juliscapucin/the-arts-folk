'use client'

import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Flip } from 'gsap/Flip'
gsap.registerPlugin(Flip)

import { Logo } from '@/components/svgs'
import { GSAPQueries } from '@/utils'

export default function Intro() {
	const pathname = usePathname()
	const introRef = useRef<HTMLDivElement | null>(null)
	const [isVisible, setIsVisible] = useState(true)

	useGSAP(() => {
		const containerElement = introRef.current
		if (!containerElement) return

		let mm = gsap.matchMedia()

		mm.add(
			GSAPQueries,
			(context) => {
				let isMobile = context.conditions?.isMobile ?? false

				gsap.set('path', { autoAlpha: 0 })
				gsap.set('.gsap-logo', { scale: isMobile ? 1 : 2 })

				let tl = gsap.timeline()

				tl.to('path', {
					autoAlpha: 1,
					stagger: 0.08,
					duration: 0.8,
					ease: 'power4.in',
					onComplete: () => {
						pathname !== '/' &&
							gsap.to('path', {
								autoAlpha: 0,
								stagger: 0.03,
								duration: 0.3,
								ease: 'power4.in',
							})
					},
				}).to('.gsap-bg', {
					yPercent: -100,
					duration: 0.8,
					delay: 0.5,
					ease: 'power4.inOut',
					onComplete: () => {
						setIsVisible(false)
					},
				})
			},
			containerElement
		)
	}, [])

	if (!isVisible) return null

	return (
		<div
			ref={introRef}
			className='fixed w-screen h-svh z-intro pointer-events-none'>
			<div className='gsap-bg fixed w-screen h-svh z-intro bg-white'></div>
			<div className='gsap-logo-container fixed top-0 left-0 w-screen h-svh flex justify-center items-center z-intro'>
				<Logo classes='gsap-logo' animate={true} />
			</div>
			<div className='gsap-header fixed top-0 left-4 lg:left-8 pt-2 flex justify-start items-end w-screen max-w-desktop h-[var(--header-height-mobile)] lg:h-[var(--header-height-desktop)] z-intro'></div>
		</div>
	)
}
