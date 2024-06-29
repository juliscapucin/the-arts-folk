"use client"

import { useRef, useState, useLayoutEffect, Suspense } from "react"
import { usePathname } from "next/navigation"
import { CldImage } from "next-cloudinary"
import ReactPlayer from "react-player/vimeo"

import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

import { usePageContext } from "@/context"
import { useReloadOnResize } from "@/hooks"
import { handlePanelSlide } from "@/lib/animations"

import { ProjectFullscreen } from "@/components"
import { Button, Heading } from "@/components/ui"
import { IconChevron } from "@/components/icons"
import { ButtonBack, ButtonClose } from "@/components/buttons"
import { Artist, Project } from "@/types"

type ProjectPageProps = {
	project: Project
	artist: Artist
}

export default function ProjectPage({ project, artist }: ProjectPageProps) {
	const { title, projectInfo, releaseDate, images } = project
	const { transitionOnClick } = usePageContext()
	const pathname = usePathname()

	const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
	const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false)
	const thumbnailsRef = useRef<HTMLDivElement>(null)
	const mainImagesRef = useRef<HTMLDivElement>(null)
	const projectInfoOuterRef = useRef<HTMLDivElement>(null)
	const projectInfoInnerRef = useRef<HTMLDivElement>(null)
	const minimapMarkerRef = useRef<HTMLDivElement>(null)

	useReloadOnResize()

	function openFullscreen(e: React.MouseEvent<HTMLButtonElement>) {
		setIsFullscreenOpen(true)
		// console.log(e.target.parentElement)
	}

	function toggleProjectInfo() {
		setIsProjectInfoOpen(!isProjectInfoOpen)
	}

	useLayoutEffect(() => {
		if (
			!mainImagesRef.current ||
			!thumbnailsRef.current ||
			!minimapMarkerRef.current
		)
			return

		gsap.registerPlugin(ScrollTrigger)
		const thumbnails = thumbnailsRef.current
		const mainImages = mainImagesRef.current
		const thumbnailsHeight = thumbnails.clientHeight
		const markerHeight = minimapMarkerRef.current.clientHeight
		const yPercentAdjust = (markerHeight / thumbnailsHeight) * 100

		//TODO: add gsap.ctx
		const tl = gsap.timeline({
			scrollTrigger: {
				trigger: mainImages,
				start: "top top+=100",
				end: "bottom bottom-=20",
				scrub: 0.5,
			},
		})

		tl.to(thumbnails, {
			yPercent: -100 + yPercentAdjust,
			duration: 1,
			ease: "linear",
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
				yPercent: -150,
				duration: 0.3,
				ease: "power2.in",
			})
			gsap.to(projectInfoInner, {
				yPercent: 150,
				duration: 0.3,
				ease: "power2.in",
			})
		}
	}, [isProjectInfoOpen])

	useLayoutEffect(() => {
		if (!projectInfoInnerRef.current || !projectInfoOuterRef.current) return

		gsap.set(projectInfoOuterRef.current, { yPercent: -150 })
		gsap.set(projectInfoInnerRef.current, { yPercent: 150 })

		window.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				setIsFullscreenOpen(false)
			}
		})
	}, [])

	return (
		<>
			<ProjectFullscreen
				{...{
					artistName: artist.name,
					images,
					isFullscreenOpen,
					setIsFullscreenOpen,
				}}
			/>
			<main className='w-full min-h-[--container-height-desktop] pt-[--header-height-desktop] md:pr-32 lg:pr-64'>
				{/* THUMBNAILS CONTAINER */}
				<div className='fixed top-0 right-0 bottom-0 left-0 pointer-events-none hidden md:block bg-primary'>
					<div className='relative max-w-desktop mx-auto'>
						<aside className='absolute top-0 right-[--margin-mobile] lg:[--margin-desktop] w-[13vw] max-w-[170px] h-full z-80'>
							{/* BUTTON CLOSE */}
							<div className='relative w-full h-40 pt-40 pb-16 flex justify-center items-center pointer-events-auto bg-primary z-150'>
								<ButtonClose
									classes='w-12 h-12 absolute top-4 right-0'
									color={"secondary"}
									action={() =>
										transitionOnClick(
											`${
												pathname.includes("artists")
													? `artists/${artist.slug}`
													: "news"
											}`
										)
									}
								/>
							</div>
							{images.length > 1 && (
								<>
									{/* MINIMAP MARKER */}
									<div
										ref={minimapMarkerRef}
										className='absolute top-[272px] w-[13vw] max-w-[176px] xl:-translate-x-[3px] h-[13.7svh] border border-secondary z-150'
									></div>
									{/* THUMBNAILS */}
									<div
										ref={thumbnailsRef}
										className='relative w-[10vw] max-w-[160px] mx-auto mt-12 pointer-events-auto space-y-2'
									>
										{images.map((image, index) => (
											<button
												onClick={() => handlePanelSlide(index)}
												className={`relative w-full bg-faded-5`}
												key={`project-thumbnail-${index}`}
											>
												{image.url.includes("vimeo") ? (
													<div className='relative w-full aspect-video'>
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
													</div>
												) : (
													<CldImage
														className={`w-full object-contain`}
														src={image.url}
														alt={`Photo ${artist.name}`}
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

				{/* HEADER */}
				<header className='relative flex flex-row justify-between flex-nowrap gap-8 w-full h-fit pt-[--header-height-desktop] bg-primary'>
					{/* HEADER LEFT */}
					<div className='flex-1 bg-primary z-80'>
						{/* MOBILE – BACK BUTTON */}
						<ButtonBack
							classes='md:hidden absolute top-6'
							href={
								pathname.includes("news") ? "/news" : `/artists/${artist.slug}`
							}
							label={pathname.includes("news") ? "News" : "Artist"}
						/>

						{/* MOBILE – RELEASE DATE */}
						<p className='block mb-4 font-script text-displaySmall md:text-displayLarge sm:hidden'>
							{releaseDate}
						</p>

						{/* TITLE */}
						<Heading tag='h1' variant='display'>
							{title}
						</Heading>
						{/* SUBTITLE */}
						<h2 className='font-script capitalize text-headlineMedium md:text-displaySmall mt-4'>
							By {artist.name}
						</h2>
						{/* MOBILE – PROJECT INFO BUTTON */}
						{projectInfo && (
							<button
								onClick={toggleProjectInfo}
								className='sm:hidden mt-6 w-full text-right font-text uppercase text-labelMedium font-medium flex gap-4 items-center justify-start'
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
						)}
					</div>

					{/* HEADER RIGHT – DESKTOP */}
					<div className='w-[40%] md:w-64 h-16 -mt-1 lg:mt-0 hidden sm:block'>
						<div className='relative'>
							<div className='absolute top-0 right-0 z-80'>
								{/* RELEASE DATE */}
								<p className='text-right font-script text-displaySmall md:text-displayLarge'>
									{releaseDate}
								</p>

								{/* PROJECT INFO BUTTON */}
								{projectInfo && (
									<div className='h-8 mt-1 md:mt-4'>
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
									</div>
								)}
							</div>
						</div>
					</div>
				</header>

				{/* MAIN IMAGES CONTAINER */}
				<section
					ref={mainImagesRef}
					className='relative flex flex-col gap-8 w-full mt-4 pt-4 pb-16 bg-primary' // Needs mt & pt because it's overlay reference
				>
					{/* MORE INFO OVERLAY */}
					<div
						ref={projectInfoOuterRef}
						className='absolute top-0 left-0 right-0 min-h-32 overflow-clip bg-primary pointer-events-none z-40'
					>
						<div
							ref={projectInfoInnerRef}
							className='py-8 h-fit w-[95%] sm:w-3/4 bg-primary'
						>
							<p className='font-text text-bodyMedium lg:text-bodyLarge lg:max-w-prose'>
								{projectInfo}
							</p>
							{pathname.includes("news") && (
								<Button
									classes='underlined-link block w-full mt-8 font-text text-labelMedium font-medium text-center pointer-events-auto'
									href={`artists/${artist.slug}`}
								>
									Go to Artist page
								</Button>
							)}
						</div>
					</div>

					{/* MAIN IMAGES */}
					{images.map((image, index) => {
						return (
							<button
								onClick={openFullscreen}
								data-id={`image-${index}`}
								className={`relative ${
									pathname.includes("news") ? "w-full sm:w-3/4" : "w-full"
								} ${index % 2 !== 0 ? "self-end" : "self-start"}`}
								key={`project-image-${index}`}
							>
								{image.url.includes("vimeo") ? (
									<div className='relative w-full aspect-video bg-faded-5'>
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
									</div>
								) : (
									<CldImage
										className={`w-full h-full object-contain`}
										src={image.url}
										alt={`Photo by ${artist.name}`}
										sizes='(max-width: 768px) 90vw, (max-width: 1200px) 90vw, 90vw'
										quality={70}
										width={image.width}
										height={image.height}
										priority={index === 0}
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
