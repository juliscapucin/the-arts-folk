"use client"

import { useState, useEffect, useRef } from "react"
import { CldImage } from "next-cloudinary"

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
	const [logoClasses, setLogoClasses] = useState("sm:scale-150 lg:scale-200")
	const logoRef = useRef<HTMLDivElement | null>(null)
	const logoHeaderRef = useRef<HTMLDivElement | null>(null)
	const logoShowreelRef = useRef<HTMLDivElement | null>(null)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)

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

	useEffect(() => {
		if (!logoRef.current || !logoHeaderRef.current || !logoShowreelRef.current)
			return
		gsap.registerPlugin(ScrollTrigger, Flip)

		const element = logoRef.current
		const logoHeader = logoHeaderRef.current
		const logoShowreel = logoShowreelRef.current

		let ctx = gsap.context(() => {
			ScrollTrigger.create({
				trigger: element,
				start: "top top",
				end: "bottom 20%",
				onEnter: () => {
					const state = Flip.getState(element)
					setLogoClasses("origin-left scale-50 md:scale-75")
					logoHeader.appendChild(element)
					Flip.from(state, {
						duration: 0.5,
						ease: "power1.inOut",
					})
				},
				onLeaveBack: () => {
					const state = Flip.getState(element)
					setLogoClasses("sm:scale-150 lg:scale-200")
					logoShowreel.appendChild(element)
					Flip.from(state, {
						duration: 0.5,
						ease: "power1.inOut",
					})
				},
			})
		})

		return () => ctx.revert()
	}, [logoRef])

	return (
		<div className='pt-[--header-height-desktop]'>
			<div className='fixed top-0 left-0 right-0 h-[--header-height-mobile] lg:h-[--header-height-desktop] pt-2 z-150 pointer-events-none'>
				<div className='w-full max-w-desktop mx-auto px-[--margin-mobile] md:px-[--margin-desktop] flex justify-start items-end '>
					<div ref={logoHeaderRef} className='h-full'></div>
				</div>
			</div>
			<div
				ref={logoShowreelRef}
				className='fixed left-0 top-0 w-screen h-svh flex justify-center items-center z-150 pointer-events-none'
			>
				<div ref={logoRef} className=''>
					<Logo
						classes={`transition-transform duration-300 ease-in ${logoClasses}`}
					/>
				</div>
			</div>
			<div className='relative w-full lg:w-1/2 h-[--showreel-height-mobile] lg:h-[--showreel-height-desktop] mx-auto overflow-clip'>
				{showreelImages.map((image, index) => {
					return (
						<div className={`absolute w-full h-full`} key={`showreel-${index}`}>
							<CldImage
								className={`object-cover md:object-contain transition-opacity duration-300 ${
									slideIndex === index ? "opacity-100 z-5" : "opacity-10 z-0"
								}`}
								src={image.url}
								alt='Showreel image'
								sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw'
								quality={50}
								fill
								priority={index <= 5 ? true : false}
							/>
							{/* This was needed for LCP performance optimization */}
							<div className={`absolute w-screen h-full bg-primary z-0`}></div>
						</div>
					)
				})}
			</div>
		</div>
	)
}
