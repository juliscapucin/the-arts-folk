'use client'

import { Suspense, useLayoutEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'

import { usePageContext } from '@/context/PageContext'
import { ButtonClose } from '@/components/buttons'
import { ImageWithSpinner, VideoPlayer } from '@/components/ui'
import { handlePanelSlide } from '@/lib/animations'

type MinimapProps = {
	images?: { url: string; width: number; height: number }[]
	artistName: string
}

export default function Minimap({ images, artistName }: MinimapProps) {
	const { handleTransitionOnClick } = usePageContext()
	const minimapMarkerRef = useRef<HTMLDivElement>(null)
	const thumbnailsRef = useRef<HTMLDivElement>(null)
	const pathname = usePathname()

	return (
		<div className='fixed top-0 right-0 bottom-0 left-0 pointer-events-none hidden md:block z-150'>
			<div className='relative max-w-desktop mx-auto'>
				<aside className='absolute top-0 right-[var(--margin-mobile)] lg:[var(--margin-desktop)] w-[13vw] max-w-[170px] h-full z-150'>
					{/* BUTTON CLOSE */}
					<div className='relative w-full h-40 pt-40 pb-16 flex justify-center items-center pointer-events-auto bg-primary z-600'>
						<ButtonClose
							classes='w-12 h-12 absolute top-4 right-0'
							color='secondary'
							action={
								pathname.includes('news')
									? () => handleTransitionOnClick('news')
									: () => handleTransitionOnClick('back')
							}
							mixBlend={false}
						/>
					</div>
					{images && images.length > 1 && (
						<>
							{/* MINIMAP MARKER */}
							<div
								ref={minimapMarkerRef}
								className='absolute top-[272px] w-[13vw] max-w-[176px] xl:-translate-x-[3px] h-[13.7svh] border border-secondary z-150'></div>
							{/* THUMBNAILS */}
							<div
								ref={thumbnailsRef}
								className='relative w-[10vw] max-w-[160px] mx-auto mt-12 pointer-events-auto space-y-2'>
								{images.map((image, index) => (
									<button
										onClick={() => handlePanelSlide(index, null)}
										className={`relative w-full`}
										key={`project-thumbnail-${index}`}>
										{image.url.includes('vimeo') ? (
											<div className='relative w-full aspect-video'>
												<VideoPlayer
													imageUrl={image.url}
													isMuted={false}
													autoplay={true}
												/>
											</div>
										) : (
											<ImageWithSpinner
												classes={`w-full object-contain`}
												src={image.url}
												alt={`Photo by ${artistName}`}
												sizes='10vw'
												quality={70}
												width={image.width}
												height={image.height}
											/>
										)}
									</button>
								))}
							</div>
						</>
					)}
				</aside>
			</div>
		</div>
	)
}
