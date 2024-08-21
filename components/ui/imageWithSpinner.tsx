"use client"

import { useState } from "react"
import { CldImage } from "next-cloudinary"

type ImageWithSpinnerProps = {
	classes: string
	src: string
	alt: string
	sizes: string
	quality: number
	width: number
	height: number
	priority?: boolean
}

export default function ImageWithSpinner({
	classes,
	src,
	alt,
	sizes,
	quality,
	width,
	height,
	priority = false,
}: ImageWithSpinnerProps) {
	const [isLoading, setIsLoading] = useState(true)

	return (
		<>
			{isLoading && (
				<div className='absolute top-0 left-0 w-full h-full bg-faded-5 flex items-center justify-center'>
					<div className='relative w-[10%] min-w-12 aspect-square animate-spin'>
						<div className='absolute w-full h-full top-0 left-0 rounded-full border border-faded-5 border-r-secondary z-10'></div>
						<div className='absolute w-full h-full top-0 left-0 rounded-full border border-faded-30 opacity-20'></div>
					</div>
				</div>
			)}
			<CldImage
				className={classes}
				src={src}
				alt={alt}
				sizes={sizes}
				quality={quality}
				width={width}
				height={height}
				onLoad={() => {
					setIsLoading(false)
				}}
				priority={priority}
			/>
		</>
	)
}
