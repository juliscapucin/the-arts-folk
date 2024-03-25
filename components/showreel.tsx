"use client"

import { useState, useEffect, useRef } from "react"
import { CldImage } from "next-cloudinary"

import { CloudinaryImage } from "@/types"

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
		<div className='relative w-full lg:w-1/2 h-[--showreel-height-mobile] lg:h-[--showreel-height-desktop] mx-auto'>
			{showreelImages.map((image, index) => {
				return (
					<div
						className='absolute w-full h-full z-10'
						key={`showreel-${index}`}
					>
						<CldImage
							className={`object-cover md:object-contain bg-primary ${
								slideIndex === index ? "opacity-100" : "opacity-0"
							}`}
							src={image.url}
							alt='photo'
							sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
							quality={50}
							fill
							priority={index === 0 || index === 1}
						/>
					</div>
				)
			})}
		</div>
	)
}
