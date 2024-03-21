"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"

type ShowreelProps = {
	showreelImages: string[]
}

const delay = 1000

export default function Showreel({ showreelImages }: ShowreelProps) {
	const [slideIndex, setSlideIndex] = useState(1)
	const showreelRef = useRef<HTMLDivElement | null>(null)
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
		<div
			ref={showreelRef}
			className='relative w-3/4 lg:w-1/2 h-[--showreel-height-mobile] lg:h-[--showreel-height-desktop] mx-auto'
		>
			{showreelImages.map((image, index) => {
				return (
					<div className='absolute w-full h-full' key={`showreel-${index}`}>
						<Image
							className={`object-contain ${
								slideIndex === index ? "opacity-100" : "opacity-0"
							}`}
							src={`/photos/${image}`}
							alt='image'
							sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw'
							quality={50}
							fill
						/>
					</div>
				)
			})}
		</div>
	)
}
