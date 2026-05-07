'use client'

import Image from 'next/image'
import { useRef } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Flip from 'gsap/Flip'
import ScrollTrigger from 'gsap/ScrollTrigger'
gsap.registerPlugin(ScrollTrigger, Flip)

import { Logo } from '@/components/svgs'

import type { CloudinaryImage } from '@/types'

type ShowreelProps = {
	showreelImages: CloudinaryImage[]
}

// LOGO FLIP ANIMATION
const moveLogo = (element: HTMLElement, targetDiv: HTMLElement) => {
	const state = Flip.getState(element)

	targetDiv.appendChild(element)

	Flip.from(state, {
		duration: 0.5,
		ease: 'power1.inOut',
	})
}

export default function Showreel({ showreelImages }: ShowreelProps) {
	const logoRef = useRef<HTMLDivElement | null>(null)
	const headerDivRef = useRef<HTMLDivElement | null>(null)
	const showreelDivRef = useRef<HTMLDivElement | null>(null)
	const showreelRef = useRef<HTMLDivElement | null>(null)

	// SLIDESHOW ANIMATION
	useGSAP(
		() => {
			if (!showreelRef.current || showreelImages.length < 2) return

			const slides = gsap.utils.toArray(
				showreelRef.current.children,
			) as HTMLElement[]

			// Initial visibility
			gsap.set(slides, { autoAlpha: 0 })
			gsap.set(slides[0], { autoAlpha: 1 })

			const tl = gsap.timeline({ repeat: -1 })

			slides.forEach((slide, i) => {
				const next = slides[(i + 1) % slides.length]
				tl.to({}, { duration: 1 }) // hold
					.set(slide, { autoAlpha: 0 }, '<')
					.to(next, { autoAlpha: 1, duration: 0.1, ease: 'power1.inOut' }, '<')
			})

			return () => tl.kill()
		},
		{ dependencies: [showreelImages.length] },
	)

	// LOGO FLIP TRIGGER
	useGSAP(() => {
		if (
			!logoRef.current ||
			!headerDivRef.current ||
			!showreelDivRef.current ||
			!showreelRef.current
		)
			return

		const logo = logoRef.current
		const headerDiv = headerDivRef.current
		const showreelDiv = showreelDivRef.current
		const showreel = showreelRef.current

		ScrollTrigger.create({
			trigger: showreel,
			start: 'bottom center-=100',
			end: 'bottom top',
			// markers: true,
			onEnter: () => {
				moveLogo(logo, headerDiv)
			},
			onLeaveBack: () => {
				moveLogo(logo, showreelDiv)
			},
		})
	}, [])

	return (
		<section className='pt-[var(--header-height-desktop)] mb-40'>
			<div className='fixed top-0 left-0 right-0 h-[var(--header-height-mobile)] lg:h-[var(--header-height-desktop)] pt-2 z-logo-header pointer-events-none'>
				{/* HEADER DIV */}
				<div className='w-full max-w-desktop mx-auto px-[var(--margin-mobile)] md:px-[var(--margin-desktop)] flex justify-start items-end '>
					<div ref={headerDivRef} className='relative h-full w-[220px]'></div>
				</div>
			</div>
			{/* SHOWREEL DIV */}
			<div className='fixed left-0 -top-1 w-screen h-svh flex justify-center items-center z-header pointer-events-none'>
				<div className='relative w-[369px] md:w-[738px]' ref={showreelDivRef}>
					<div ref={logoRef} className='mt-2'>
						<Logo classes='w-full h-auto' />
					</div>
				</div>
			</div>
			<div
				ref={showreelRef}
				className='relative w-full lg:w-1/2 h-[var(--showreel-height-mobile)] lg:h-[var(--showreel-height-desktop)] mx-auto overflow-clip'>
				{showreelImages.map((image, index) => {
					return (
						<div className='absolute w-full h-full' key={`showreel-${index}`}>
							<Image
								className={`object-cover md:object-contain`}
								src={image.url}
								alt='Showreel image'
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw'
								quality={50}
								fill
								priority={index <= 4 ? true : false}
							/>
						</div>
					)
				})}
			</div>
		</section>
	)
}
