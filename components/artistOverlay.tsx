'use client'

import ReactPlayer from 'react-player/vimeo'
import Image from 'next/image'

import type { ScrapbookImage } from '@/types'
import { useEffect, useState } from 'react'

type ArtistOverlayProps = {
	images: ScrapbookImage[]
	isVisible: boolean
	index: number
	artistName: string
}

type ArtistOverlayImageProps = {
	url: string
	isVisible: boolean
	classes?: string
	artistName: string
}

const ArtistOverlayImage = ({
	url,
	isVisible,
	classes,
	artistName,
}: ArtistOverlayImageProps) => {
	return (
		<div
			className={`relative w-[80%] lg:w-[50%] transition-opacity duration-700 ${classes} ${
				isVisible ? '' : 'opacity-0'
			}`}>
			{url.includes('vimeo') ? (
				<ReactPlayer
					url={url}
					playing
					playsinline
					width='100%'
					height='100%'
					controls={false}
					muted={true}
					loop={true}
				/>
			) : (
				<Image
					className={`object-contain p-4`}
					src={url}
					alt={`Photo by ${artistName}`}
					sizes='(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 20vw'
					quality={40}
					fill
				/>
			)}
		</div>
	)
}

export default function ArtistOverlay({
	images,
	isVisible,
	index,
	artistName,
}: ArtistOverlayProps) {
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)
	}, [])

	return (
		<div
			className={`flex ${
				index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
			} fixed top-[var(--header-height-desktop)] left-auto w-full py-16 pr-8 lg:pr-20 max-w-desktop h-[var(--container-height-mobile)] lg:h-[var(--container-height-desktop)] justify-between pointer-events-none transition-opacity duration-500 z-80 mix-blend-multiply`}>
			{isClient && (
				<>
					{/* LEFT */}
					<div className='relative w-[45%] lg:w-[40%] h-full flex flex-col gap-2 md:gap-4'>
						<div className='relative flex flex-col lg:flex-row w-full h-full lg:h-1/2 gap-4'>
							<ArtistOverlayImage
								url={images[0].url}
								classes={`h-full self-end ${isVisible && 'delay-200'}`}
								isVisible={isVisible}
								artistName={artistName}
							/>

							<ArtistOverlayImage
								url={images[1].url}
								classes={`h-full lg:top-32 ${isVisible && 'delay-300'}`}
								isVisible={isVisible}
								artistName={artistName}
							/>
						</div>

						<ArtistOverlayImage
							url={images[2].url}
							classes={`h-1/2 ${isVisible && 'delay-500'}`}
							isVisible={isVisible}
							artistName={artistName}
						/>
					</div>
					{/* RIGHT */}
					{images[3]?.url && images[4]?.url && (
						<div className='relative w-[45%] lg:w-[40%] h-full flex flex-col lg:flex-row gap-4'>
							<ArtistOverlayImage
								url={images[3].url}
								classes={`h-1/2 ${isVisible && 'delay-200'}`}
								isVisible={isVisible}
								artistName={artistName}
							/>

							<ArtistOverlayImage
								url={images[4].url}
								classes={`h-1/2 self-end ${isVisible && 'delay-300'}`}
								isVisible={isVisible}
								artistName={artistName}
							/>
						</div>
					)}
				</>
			)}
		</div>
	)
}
