"use client"

import { CldImage } from "next-cloudinary"

import ReactPlayer from "react-player/vimeo"

import { News } from "@/types"
import { Heading } from "@/components/ui"
import { IconChevron } from "@/components/icons"
import { Fragment } from "react"
import { ButtonClose } from "@/components/buttons"

export default function NewsPage(news: News) {
	const { title, subtitle, projectInfo, releaseDate, images, artistPage } = news
	// console.log(news.images)

	return (
		<main className='w-full min-h-[--container-height-desktop] pt-[--header-height-desktop] pr-64'>
			{/* Thumbnails */}
			<aside className='fixed right-0 w-40 h-full z-80'>
				<div className='relative w-full h-40 flex justify-center items-center'>
					<ButtonClose
						color={"secondary"}
						action={() => console.log("close")}
					/>
				</div>
				<div className='space-y-8'>
					{images.map((image, index) => (
						<div className='relative w-full h-16' key={`news-image-${index}`}>
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
									className={`object-contain`}
									src={image.url}
									alt={`Photo by hello`}
									sizes='(max-width: 768px) 90vw, (max-width: 1200px) 90vw, 90vw'
									quality={70}
									fill
								/>
							)}
						</div>
					))}
				</div>
			</aside>
			<div className='flex flex-row justify-between flex-nowrap gap-8 w-full h-40 pt-16'>
				{/* Title + subtitle */}
				<div className='flex-1'>
					<Heading tag='h1' classes=''>
						{title}
					</Heading>
					<h2>{subtitle}</h2>
				</div>
				{/* Release date + project info*/}
				<div className='w-64 h-16'>
					<p className='text-right'>{releaseDate}</p>
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
			<section>
				<div className='space-y-8'>
					{images.map((image, index) => (
						<div
							className='relative h-[--container-height-desktop] w-full bg-faded-5'
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
									className={`ml-0 mr-auto object-contain`}
									src={image.url}
									alt={`Photo by hello`}
									sizes='(max-width: 768px) 90vw, (max-width: 1200px) 90vw, 90vw'
									quality={70}
									fill
								/>
							)}
						</div>
					))}
				</div>
			</section>
		</main>
	)
}
