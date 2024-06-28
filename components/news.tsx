"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { CldImage } from "next-cloudinary"
import ReactPlayer from "react-player/vimeo"

import { formatDate } from "@/utils"

import { Button } from "@/components/ui"

import { Project } from "@/types"
import { CustomCursor } from "@/components"

type NewsProps = {
	news: Project[]
}

const alignment = [
	"items-start justify-start xl:-translate-y-4", // 1
	"justify-center items-end xl:justify-start xl:translate-y-24", // 2
	"items-center justify-center xl:items-center xl:justify-end", // 3
	"items-end justify-end xl:items-start xl:justify-start xl:-translate-y-4", // 4
	"items-start justify start xl:items-end xl:justify-center xl:translate-y-24", // 5
	"items-center justify-end", // 6
	"items-center justify-center xl:justify-start", // 7
	"items-end justify-center xl:justify-start xl:translate-y-24", // 8
	"items-start justify-start xl:justify-end", // 9
	"items-center justify-center xl:items-center xl:justify-start", // 10
	"items-start justify-center xl:items-end xl:justify-start xl:translate-y-24", // 11
	"items-end justify-end xl:items-start xl:justify-end", // 12
	"items-center justify-start xl:items-center xl:justify-start", // 13
	"items-start justify-center xl:items-end xl:justify-end xl:translate-y-24", // 14
	"items-end justify-start xl:items-start xl:justify-end", // 15
]

export default function News({ news }: NewsProps) {
	const [isHovering, setIsHovering] = useState(false)
	const buttonRefs = useRef<(HTMLElement | null)[]>([])

	const handleMouseEnter = useCallback((e: MouseEvent) => {
		setIsHovering(true)
	}, [])

	const handleMouseLeave = useCallback(() => {
		setIsHovering(false)
	}, [])

	useEffect(() => {
		if (!buttonRefs.current) return

		const buttons = buttonRefs.current
		buttons.forEach((button, index) => {
			button?.addEventListener("mouseenter", (e) => handleMouseEnter(e))
			button?.addEventListener("mouseleave", handleMouseLeave)
		})

		return () => {
			buttons.forEach((button) => {
				button?.removeEventListener("mouseenter", handleMouseEnter)
				button?.removeEventListener("mouseleave", handleMouseLeave)
			})
		}
	}, [buttonRefs.current])

	return (
		<section className='relative mt-32 mb-32 w-full max-w-desktop flex flex-wrap gap-y-16 md:gap-y-24'>
			{/* <CustomCursor
				isHovering={isHovering}
				label={"View"}
				isActive={true}
				variant='gallery'
			/> */}
			{news.map((project, index) => {
				const aspectRatio = project.images[0].width / project.images[0].height

				const imageSizeSmall = aspectRatio > 1 ? "w-[60%]" : "w-2/3 md:w-[42%]"
				const imageSizeBig =
					aspectRatio > 1
						? "w-full sm:w-[80%] xl:w-3/4"
						: "w-[65%] sm:[60%] md:[35%] lg:w-[50%] xl:w-[57%]" // horizontal : vertical

				const isVideo = project.images[0].url.includes("vimeo")

				return (
					<article
						className={`relative sm:basis-1/2 xl:basis-1/3 h-fit sm:h-[60svh] md:h[70svh] lg:h[80svh] xl:h-[85svh] flex  ${
							alignment.length > 2
								? alignment[index % alignment.length]
								: "items-center justify-center"
						}`}
						key={project.slug}
					>
						<Button
							ref={(el) => {
								buttonRefs.current[index] = el
							}}
							href={`/news/${project.slug}`}
							classes={`relative overflow-clip flex flex-col group ${
								isVideo
									? "w-full sm:w-[90%]"
									: project.newsPageSize === "small"
									? imageSizeSmall
									: imageSizeBig
							}`}
						>
							{/* Release Date */}
							<p className='block font-script text-headlineLarge md:text-displaySmall mb-1'>
								{/* [{index + 1}] */}
								{formatDate(project.releaseDate)}
							</p>

							{/* Project Image */}
							<div className='bg-faded-5 overflow-clip'>
								{isVideo ? (
									<div className='w-full aspect-video group-hover:scale-110 transition-transform duration-200 ease-in-out'>
										<ReactPlayer
											url={project.images[0].url}
											playing
											playsinline
											width='100%'
											height='100%'
											controls={false}
											muted={true}
											loop={true}
										/>
									</div>
								) : (
									<CldImage
										className='object-contain group-hover:scale-110 transition-transform duration-300 ease-in-out'
										src={project.images[0].url}
										alt={`Photo by ${project.artistInfo?.name}`}
										sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
										quality={70}
										width={project.images[0].width}
										height={project.images[0].height}
									/>
								)}
							</div>

							{/* Project Info */}
							<p className='block mt-3'>{project.title}</p>
							<p className='block font-script text-headlineSmall md:text-headlineMedium capitalize tracking-tighter'>
								By {project.artistInfo?.name}
							</p>
						</Button>
					</article>
				)
			})}
		</section>
	)
}
