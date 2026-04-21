'use client'

import { useRef } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'

import { IconScrollDown } from '@/components/icons'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollTip() {
	const scrollTipRef = useRef<HTMLDivElement>(null)

	useGSAP(() => {
		if (!scrollTipRef.current) return

		ScrollTrigger.create({
			trigger: 'body',
			start: 'top top-=100',
			end: 'bottom bottom',
			onEnter: () => scrollTipRef.current?.classList.add('opacity-0'),
			onLeaveBack: () => scrollTipRef.current?.classList.remove('opacity-0'),
		})
	}, [])

	return (
		<div
			ref={scrollTipRef}
			className='fixed mx-auto top-0 right-1 lg:right-6 h-screen pb-24 flex flex-col items-center justify-end gap-8 transition-opacity duration-500 delay-300 z-100'>
			<span className='font-text -rotate-90 text-label-medium md:text-label-large'>
				Scroll
			</span>
			<IconScrollDown />
		</div>
	)
}
