"use client"

import { useState } from "react"
import { CldImage } from "next-cloudinary"

import ReactPlayer from "react-player/vimeo"

import { News } from "@/types"
import { NewsFullscreen } from "@/components"
import { Heading } from "@/components/ui"
import { IconChevron } from "@/components/icons"
import { ButtonClose } from "@/components/buttons"

export default function NewsPage(news: News) {
	const { title, subtitle, projectInfo, releaseDate, images, artistPage } = news
	const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)

	function openFullscreen(e: React.MouseEvent<HTMLButtonElement>) {
		setIsFullscreenOpen(true)
		// console.log(e.target.parentElement)
	}

	return (
		<>
			<NewsFullscreen {...{ images, isFullscreenOpen, setIsFullscreenOpen }} />
			<main className='w-full min-h-[--container-height-desktop] pt-[--header-height-desktop] pr-64'>
				{/* Thumbnails */}
				<div className='fixed top-0 right-0 bottom-0 left-0 pointer-events-none'>
					<div className='relative max-w-desktop mx-auto'>
						<aside className='absolute top-[--header-height-desktop] right-0 pt-16 w-40 h-full z-80'>
							<div className='relative w-full h-40 flex justify-center items-center pointer-events-auto'>
								<ButtonClose
									color={"secondary"}
									action={() => console.log("close")}
								/>
							</div>
							<div className='space-y-8'>
								{images.map((image, index) => (
									<button
										onClick={() => console.log("clicked")}
										className='relative w-full h-auto min-h-16'
										key={`news-thumbnail-${index}`}
									>
										{image.url.includes("vimeo") ? (
											<ReactPlayer
												url={image.url}
												playing
												playsinline
												width='100%'
												height='100%'
												controls={false}
												muted={true}
												loop={true}
											/>
										) : (
											<CldImage
												className={`w-full object-contain`}
												src={image.url}
												alt={`Photo by hello`}
												sizes='(max-width: 768px) 20vw, (max-width: 1200px) 20vw, 10vw'
												quality={70}
												width={image.width}
												height={image.height}
											/>
										)}
									</button>
								))}
							</div>
						</aside>
					</div>
				</div>
				<div className='flex flex-row justify-between flex-nowrap gap-8 w-full h-40 pt-[--header-height-desktop]'>
					{/* Title + subtitle */}
					<div className='flex-1'>
						<Heading tag='h1' classes=''>
							{title}
						</Heading>
						<h2 className='font-script capitalize text-displaySmall'>
							{subtitle}
						</h2>
					</div>
					{/* Release date + project info*/}
					<div className='w-64 h-16'>
						<p className='text-right font-script text-displayLarge'>
							{releaseDate}
						</p>
						<div className='h-8 overflow-clip'>
							<button className='mb-4 w-full text-right font-text uppercase text-labelMedium md:text-labelLarge flex gap-4 items-center justify-end'>
								Project info{" "}
								<span>
									<IconChevron />
								</span>
							</button>
							<div>
								<p className='font-text'>{projectInfo}</p>
								<a href='/'>Artist page</a>
							</div>
						</div>
					</div>
				</div>
				{/* Main images */}
				<section className='flex flex-col gap-8 w-full py-16'>
					{images.map((image, index) => {
						return (
							<button
								onClick={openFullscreen}
								className={`relative w-3/4 ${
									index % 2 !== 0 ? "self-end" : "self-start"
								}`}
								key={`news-image-${index}`}
							>
								{image.url.includes("vimeo") ? (
									<ReactPlayer
										url={image.url}
										playing
										playsinline
										width='100%'
										height='100%'
										controls={false}
										muted={true}
										loop={true}
									/>
								) : (
									<CldImage
										className={`w-full h-full object-contain`}
										src={image.url}
										alt={`Photo by hello`}
										sizes='(max-width: 768px) 90vw, (max-width: 1200px) 90vw, 90vw'
										quality={70}
										width={image.width}
										height={image.height}
									/>
								)}
							</button>
						)
					})}
				</section>
			</main>
		</>
	)
}
