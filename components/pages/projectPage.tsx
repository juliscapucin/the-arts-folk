"use client"

import { useRef, useState, useLayoutEffect, Suspense } from "react"
import { usePathname } from "next/navigation"
import ReactPlayer from "react-player/vimeo"

import { gsap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

import { usePageContext } from "@/context"
import { useReloadOnResize, useWindowDimensions } from "@/hooks"
import { handlePanelSlide } from "@/lib/animations"

import {
	Button,
	Container,
	Heading,
	ImageWithSpinner,
	VideoPlayer,
	VideoPlayerControls,
} from "@/components/ui"
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
	const { width } = useWindowDimensions()

	const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)
	const [isProjectInfoOpen, setIsProjectInfoOpen] = useState(false)
	const thumbnailsRef = useRef<HTMLDivElement>(null)
	const mainImagesRef = useRef<HTMLDivElement>(null)
	const projectInfoOuterRef = useRef<HTMLDivElement>(null)
	const projectInfoInnerRef = useRef<HTMLDivElement>(null)
	const minimapMarkerRef = useRef<HTMLDivElement>(null)

	useReloadOnResize()

	function openFullscreen(
		e: React.MouseEvent<HTMLButtonElement>,
		index: number
	) {
		setIsFullscreenOpen(true)
		setTimeout(() => {
			handlePanelSlide(index, mainImagesRef.current)
		}, 500)
	}

	function closeFullscreen() {
		setIsFullscreenOpen(false)
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
		<Container classes='pt-[--header-height-desktop] md:pr-32 lg:pr-64'>
			{/* CLOSE FULLSCREEN */}
			{isFullscreenOpen && (
				<div className='fixed top-0 left-0 right-0 h-32 z-[401] flex justify-end mr-8'>
					<ButtonClose color='primary' action={closeFullscreen} mixBlend />
				</div>
			)}
			{/* THUMBNAILS CONTAINER */}
			<div className='fixed top-0 right-0 bottom-0 left-0 pointer-events-none hidden md:block z-150'>
				<div className='relative max-w-desktop mx-auto'>
					<aside className='absolute top-0 right-[--margin-mobile] lg:[--margin-desktop] w-[13vw] max-w-[170px] h-full z-150'>
						{/* BUTTON CLOSE */}
						<div className='relative w-full h-40 pt-40 pb-16 flex justify-center items-center pointer-events-auto bg-primary z-600'>
							<ButtonClose
								classes='w-12 h-12 absolute top-4 right-0'
								color='secondary'
								action={
									pathname.includes("news")
										? () => transitionOnClick("news")
										: () => transitionOnClick("back")
								}
								mixBlend={false}
							/>
						</div>
						{images && images.length > 1 && (
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
											onClick={() => handlePanelSlide(index, null)}
											className={`relative w-full`}
											key={`project-thumbnail-${index}`}
										>
											{image.url.includes("vimeo") ? (
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
						classes='md:hidden absolute top-8'
						href={pathname.includes("news") ? "/news" : "back"}
						label={pathname.includes("news") ? "News" : "Artist"}
					/>

					{/* MOBILE – RELEASE DATE */}
					{/* <p className='block mb-4 font-script text-displaySmall md:text-displayLarge sm:hidden'>
						{releaseDate}
					</p> */}

					{/* TITLE */}
					<Heading tag='h1' variant='display'>
						{title}
					</Heading>
					{/* SUBTITLE */}
					{artist.slug && artist.name && artist.name !== "The Arts Folk" && (
						<Button href={`/artists/${artist.slug}`}>
							<h2 className='font-script capitalize text-headlineMedium md:text-displaySmall lg:mt-2'>
								By {artist.name}
							</h2>
						</Button>
					)}
					{artist.name == "The Arts Folk" && (
						<h2 className='font-script capitalize text-headlineMedium md:text-displaySmall lg:mt-2'>
							By The Arts Folk
						</h2>
					)}
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
							{pathname.includes("news") && (
								<p className='text-right font-script text-displaySmall md:text-displayLarge'>
									{releaseDate}
								</p>
							)}

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
				className='relative w-full mt-4 pt-4 pr-4 pb-16 bg-primary' // Needs mt & pt because it's overlay reference
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
				<div
					ref={mainImagesRef}
					className={`bg-primary flex flex-col gap-8 w-full ${
						isFullscreenOpen
							? "fixed inset-0 z-fullscreen overflow-y-scroll"
							: ""
					}`}
				>
					{images &&
						images.map((image, index) =>
							width > 640 ? (
								<button
									onClick={(e) =>
										!image.url.includes("vimeo") && openFullscreen(e, index)
									}
									data-id={`image-${index}`}
									className={`relative ${
										pathname.includes("news") && !isFullscreenOpen
											? "w-full sm:w-3/4"
											: "w-full"
									} ${index % 2 !== 0 ? "self-end" : "self-start"}`}
									key={`project-image-${index}`}
								>
									{image.url.includes("vimeo") ? (
										<div className='relative w-full aspect-video'>
											<VideoPlayer
												imageUrl={image.url}
												isMuted={false}
												autoplay={true}
											/>
										</div>
									) : (
										<ImageWithSpinner
											classes={`w-full h-full object-contain`}
											src={image.url}
											alt={`Photo by ${artist.name}`}
											sizes='(max-width: 768px) 90vw, (max-width: 1200px) 100vw, 100vw'
											quality={70}
											width={image.width}
											height={image.height}
											priority={index === 0}
										/>
									)}
								</button>
							) : (
								<div className='relative w-full' key={`project-image-${index}`}>
									{image.url.includes("vimeo") ? (
										<div className='relative w-full aspect-video'>
											<VideoPlayer
												imageUrl={image.url}
												isMuted={false}
												autoplay={true}
											/>
										</div>
									) : (
										<ImageWithSpinner
											classes={`w-full h-full object-contain`}
											src={image.url}
											alt={`Photo by ${artist.name}`}
											sizes='(max-width: 768px) 90vw, (max-width: 1200px) 100vw, 100vw'
											quality={70}
											width={image.width}
											height={image.height}
											priority={index === 0}
										/>
									)}
								</div>
							)
						)}
				</div>
			</section>
		</Container>
	)
}
