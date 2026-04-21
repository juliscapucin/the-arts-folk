'use client'

import { useState } from 'react'
import Image, { type ImageProps } from 'next/image'

export default function ImageWithSpinner(props: Omit<ImageProps, 'onLoad'>) {
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
			<Image
				{...props}
				onLoad={() => {
					setIsLoading(false)
				}}
			/>
		</>
	)
}
