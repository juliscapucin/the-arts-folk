"use client"

import { useState, useEffect, useRef } from "react"
import { CldImage } from "next-cloudinary"

import { Logo } from "@/components/svgs"

import type { CloudinaryImage } from "@/types"

type ShowreelProps = {
	showreelImages: CloudinaryImage[]
}

const delay = 1000

export default function Showreel({ showreelImages }: ShowreelProps) {
	const [slideIndex, setSlideIndex] = useState(1)
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

	return (
		<>
			<div className='fixed top-0 left-0 w-screen h-svh flex justify-center items-center lg:scale-200 z-20'>
				<Logo />
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
								priority={index <= 9 ? true : false}
							/>
							{/* This was needed for LCP performance optimization */}
							<div className={`absolute w-screen h-full bg-primary z-0`}></div>
						</div>
					)
				})}
			</div>
		</>
	)
}
