"use client"

import { useRef, useState, useLayoutEffect, use, useEffect } from "react"
import { CldImage } from "next-cloudinary"
import ReactPlayer from "react-player/vimeo"

import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

import { usePageContext } from "@/context"

import { ProjectFullscreen } from "@/components"
import { Heading } from "@/components/ui"
import { IconChevron } from "@/components/icons"
import { ButtonClose } from "@/components/buttons"
import { Artist, Project } from "@/types"

type ProjectPageProps = {
	project: Project
	artist: Artist
}

export default function ProjectPage({ project, artist }: ProjectPageProps) {
	const { title, projectInfo, releaseDate, images } = project
	const { transitionOnClick } = usePageContext()

	const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
	const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false)
	const thumbnailsRef = useRef<HTMLDivElement>(null)
	const mainImagesRef = useRef<HTMLDivElement>(null)
	const projectInfoOuterRef = useRef<HTMLDivElement>(null)
	const projectInfoInnerRef = useRef<HTMLDivElement>(null)
	const minimapMarkerRef = useRef<HTMLDivElement>(null)

	function openFullscreen(e: React.MouseEvent<HTMLButtonElement>) {
		setIsFullscreenOpen(true)
		// console.log(e.target.parentElement)
	}

	function toggleProjectInfo() {
		setIsProjectInfoOpen(!isProjectInfoOpen)
	}

	useEffect(() => {
		if (!minimapMarkerRef.current) return
		const minimapMarker = minimapMarkerRef.current
		const viewportHeight = window.innerHeight
		const viewportWidth = window.innerWidth
		const minimapMarquerHeight =
			(minimapMarker.clientWidth * viewportHeight) / viewportWidth
	}, [])

	useLayoutEffect(() => {
		if (!mainImagesRef.current || !thumbnailsRef.current) return

		gsap.registerPlugin(ScrollTrigger)
		const thumbnails = thumbnailsRef.current
		const mainImages = mainImagesRef.current

		//TODO: add gsap.ctx
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: mainImages,
				start: "top top+=100",
				end: "bottom bottom-=100",
				scrub: 1,
			},
		})

		tl.to(thumbnails, {
			yPercent: -88,
			duration: 1,
			ease: "none",
		})
	}, [thumbnailsRef, mainImagesRef])

	useLayoutEffect(() => {
		if (!projectInfoOuterRef.current || !projectInfoInnerRef.current) return

		const projectInfoOuter = projectInfoOuterRef.current
		const projectInfoInner = projectInfoInnerRef.current

		if (isProjectInfoOpen) {
			gsap.to(projectInfoOuter, {
				yPercent: 0,
				duration: 0.3,
				ease: "power2.out",
			})
			gsap.to(projectInfoInner, {
				yPercent: 0,
				duration: 0.3,
				ease: "power2.out",
			})
		} else {
			gsap.to(projectInfoOuter, {
				yPercent: -100,
				duration: 0.3,
				ease: "power2.in",
			})
			gsap.to(projectInfoInner, {
				yPercent: 100,
				duration: 0.3,
				ease: "power2.in",
			})
		}
	}, [isProjectInfoOpen])

	return (
		<>
			<ProjectFullscreen
				{...{ images, isFullscreenOpen, setIsFullscreenOpen }}
			/>
			<main className='w-full min-h-[--container-height-desktop] pt-[--header-height-desktop] lg:pr-64'>
				{/* Thumbnails Container */}
				<div className='fixed top-0 right-0 bottom-0 left-0 pointer-events-none hidden lg:block'>
					<div className='relative max-w-desktop mx-auto'>
						<aside className='absolute top-[--header-height-desktop] right-[--margin-mobile] lg:[--margin-desktop] w-[13vw] max-w-[170px] h-full z-80'>
							{/* Button Close */}
							<div className='relative w-full h-40 pt-16 flex justify-center items-center pointer-events-auto bg-primary z-150'>
								<ButtonClose
									color={"secondary"}
									action={() => transitionOnClick("/")}
								/>
							</div>
							{/* Minimap Marker */}
							<div
								ref={minimapMarkerRef}
								className='absolute w-[13vw] max-w-[170px] h-[--minimap-height] border border-secondary z-150'
							></div>
							{/* Thumbnails */}
							<div
								ref={thumbnailsRef}
								className='relative w-[10vw] max-w-[160px] mx-auto space-y-1 pointer-events-auto'
							>
								{images.map((image, index) => (
									<button
										onClick={() => console.log("clicked")}
										className='relative w-full'
										key={`project-thumbnail-${index}`}
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
												sizes='10vw'
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
							By {artist.name}
						</h2>
					</div>
					{/* Release date + project info*/}
					<div className='w-64 h-16'>
						<p className='text-right font-script text-displayLarge'>
							{releaseDate}
						</p>
						<div className='h-8'>
							<button
								onClick={toggleProjectInfo}
								className='mb-4 w-full text-right font-text uppercase text-labelMedium font-medium flex gap-4 items-center justify-end'
							>
								Project info
								<span
									className={`${
										isProjectInfoOpen ? "rotate-180" : ""
									} transition-transform duration-300 ease-in-out`}
								>
									<IconChevron />
								</span>
							</button>
							<div
								ref={projectInfoOuterRef}
								className='absolute left-[--margin-mobile] md:left-[--margin-desktop] right-64 h-48 overflow-clip pointer-events-none z-150'
							>
								<div
									ref={projectInfoInnerRef}
									className='mt-16 mb-8 h-48 w-3/4 bg-primary'
								>
									<p className='mb-8 font-text max-w-prose'>{projectInfo}</p>
									<a
										className='block w-full font-text text-labelMedium font-medium text-center underline hover:no-underline'
										href='/'
									>
										Go to Artist page
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
				{/* Main images */}
				<section
					ref={mainImagesRef}
					className='flex flex-col gap-8 w-full py-16'
				>
					{images.map((image, index) => {
						return (
							<button
								onClick={openFullscreen}
								className={`relative w-3/4 ${
									index % 2 !== 0 ? "self-end" : "self-start"
								}`}
								key={`project-image-${index}`}
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
