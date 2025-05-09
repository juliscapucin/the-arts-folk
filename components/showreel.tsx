"use client"

import { useState, useEffect, useRef, useLayoutEffect } from "react"
import Image from "next/image"

import gsap from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"
import Flip from "gsap/Flip"

import { Logo } from "@/components/svgs"

import type { CloudinaryImage } from "@/types"

type ShowreelProps = {
	showreelImages: CloudinaryImage[]
}

const delay = 1000

export default function Showreel({ showreelImages }: ShowreelProps) {
	const [slideIndex, setSlideIndex] = useState(1)
	const logoRef = useRef<HTMLDivElement | null>(null)
	const logoHeaderRef = useRef<HTMLDivElement | null>(null)
	const logoShowreelRef = useRef<HTMLDivElement | null>(null)
	const showreelRef = useRef<HTMLDivElement | null>(null)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

	// SLIDE ANIMATION
	const resetTimeout = () => {
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current)
		}
	}

	useEffect(() => {
		resetTimeout()
		timeoutRef.current = setTimeout(
			() =>
				setSlideIndex((prevIndex) =>
					prevIndex === showreelImages.length - 1 ? 0 : prevIndex + 1
				),
			delay
		)

		return () => {
			resetTimeout()
		}
	}, [slideIndex])

	// LOGO ANIMATION
	const moveLogo = (element: HTMLElement, targetDiv: HTMLElement) => {
		const state = Flip.getState(element)

		targetDiv.appendChild(element)

		Flip.from(state, {
			duration: 0.5,
			ease: "power1.inOut",
		})
	}

	useLayoutEffect(() => {
		if (
			!logoRef.current ||
			!logoHeaderRef.current ||
			!logoShowreelRef.current ||
			!showreelRef.current
		)
			return

		gsap.registerPlugin(ScrollTrigger, Flip)

		const element = logoRef.current
		const logoHeader = logoHeaderRef.current
		const logoShowreel = logoShowreelRef.current
		const showreel = showreelRef.current

		// logoHeaderToCenter(element, logoShowreel)

		let ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: showreel,
				start: "bottom center-=100",
				end: "bottom top",
				// markers: true,
				onEnter: () => {
					moveLogo(element, logoHeader)
				},
				onLeaveBack: () => {
					moveLogo(element, logoShowreel)
				},
			})
		})

		return () => ctx.revert()
	}, [logoRef.current, showreelRef.current])

	return (
		<section className='pt-[--header-height-desktop] mb-40'>
			<div className='fixed top-0 left-0 right-0 h-[--header-height-mobile] lg:h-[--header-height-desktop] pt-2 z-logoHeader pointer-events-none'>
				<div className='w-full max-w-desktop mx-auto px-[--margin-mobile] md:px-[--margin-desktop] flex justify-start items-end '>
					<div ref={logoHeaderRef} className='relative h-full w-[220px]'></div>
				</div>
			</div>
			<div className='fixed left-0 -top-1 w-screen h-svh flex justify-center items-center z-header pointer-events-none'>
				<div className='relative w-[369px] md:w-[738px]' ref={logoShowreelRef}>
					<div ref={logoRef} className='mt-2'>
						<Logo classes='w-full h-auto' />
					</div>
				</div>
			</div>
			<div
				ref={showreelRef}
				className='relative w-full lg:w-1/2 h-[--showreel-height-mobile] lg:h-[--showreel-height-desktop] mx-auto overflow-clip'
			>
				{showreelImages.map((image, index) => {
					return (
						<div className={`absolute w-full h-full`} key={`showreel-${index}`}>
							<Image
								className={`object-cover md:object-contain transition-opacity duration-300 ${
									slideIndex === index ? "opacity-100 z-5" : "opacity-10 z-0"
								}`}
								src={image.url}
								alt='Showreel image'
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw'
								quality={50}
								fill
								priority={index <= 4 ? true : false}
							/>
							{/* This was needed for LCP performance optimization */}
							<div className={`absolute w-screen h-full bg-primary z-0`}></div>
						</div>
					)
				})}
			</div>
		</section>
	)
}
