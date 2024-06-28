"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { CldImage } from "next-cloudinary"
import ReactPlayer from "react-player/vimeo"

import gsap from "gsap"

import { useWindowDimensions } from "@/hooks"

import { Artist, Project } from "@/types"
import { Button, Container, Heading } from "@/components/ui"
import { ArtistAside, CustomCursor } from "@/components"
import { IconGallery, IconThumbnails } from "@/components/icons"
import { ButtonBack } from "@/components/buttons"

type artistPageProps = {
	artist: Artist
	projects: Project[]
	sectionSlug: string
	artistSections: string[]
}

export default function ArtistPage({
	artist,
	projects,
	sectionSlug,
	artistSections,
}: artistPageProps) {
	const [view, setView] = useState("thumbnail")
	const [isHovering, setIsHovering] = useState(false)
	const [activeProject, setActiveProject] = useState<Project | null>(null)
	const imagesSectionRef = useRef<HTMLDivElement>(null)
	const changeViewButtonRef = useRef<HTMLButtonElement>(null)
	const buttonRefs = useRef<(HTMLAnchorElement | null)[]>([])

	const { width } = useWindowDimensions()

	const handleMouseEnter = useCallback(
		(e: MouseEvent) => {
			setIsHovering(true)
			projects.forEach((project, index) => {
				if (buttonRefs.current[index] === e.target) {
					setActiveProject(project)
				}
			})
		},
		[projects]
	)

	const handleMouseLeave = useCallback(() => {
		setIsHovering(false)
	}, [])

	useEffect(() => {
		if (!buttonRefs.current) return
		const buttons = buttonRefs.current

		buttons.forEach((button) => {
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

	useEffect(() => {
		if (width < 768) {
			setView("gallery")
			return
		} else {
			setView("thumbnail")
		}
	}, [width])

	const toggleView = useCallback(() => {
		const tl = gsap.timeline({
			onComplete: () => {
				setView((prevView) =>
					prevView === "gallery" ? "thumbnail" : "gallery"
				)
				gsap.to(imagesSectionRef.current, {
					opacity: 1,
					duration: 0.4,
				})
				gsap.to(changeViewButtonRef.current, {
					opacity: 1,
					duration: 0.4,
				})
			},
		})

		tl.to(imagesSectionRef.current, {
			opacity: 0,
			duration: 0.4,
		}).to(
			changeViewButtonRef.current,
			{
				opacity: 0,
				duration: 0.4,
			},
			"<"
		)
	}, [])

	return (
		<Container hasPadding classes='pt-[--header-height-desktop]'>
			<div className='relative w-full'>
				<ArtistAside {...{ artist, sectionSlug, artistSections }} />

				{/* BACK BUTTON */}
				<ButtonBack href='/artists' label='Artists' classes='pt-8' />

				{/* MOBILE – HEADER */}
				<Heading tag='h1' classes='mt-4 mb-6 leading-tightest md:hidden'>
					{artist.name}
				</Heading>

				<section className='relative ml-[25%] w-9/12'>
					{/* DESKTOP – HEADER */}
					<header className='hidden pb-4 md:flex items-end justify-between bg-primary z-50'>
						<Heading tag='h1' classes='pl-4 leading-tightest'>
							{artist.name}
						</Heading>
						<button
							ref={changeViewButtonRef}
							onClick={toggleView}
							className='pl-4 md:pl-0 mt-2 md:mt-0 font-text text-labelLarge font-medium uppercase flex items-center gap-2'
						>
							<span className='underlined-link block'>
								{view === "thumbnail" ? "Gallery" : "Thumbnails"}
							</span>

							{/* VIEW ICONS */}
							{view === "thumbnail" ? <IconThumbnails /> : <IconGallery />}
						</button>
					</header>
					<div ref={imagesSectionRef} className='flex flex-wrap'>
						{projects.map((project, index) => {
							const firstImage = project.images[0]
							const isVideo = firstImage.url.includes("vimeo")

							return (
								<Button
									ref={(el) => {
										buttonRefs.current[index] = el
									}}
									classes={`relative overflow-hidden pl-4 cursor-pointer ${
										view === "thumbnail"
											? `h-36 md:h-72 pb-4 ${isVideo ? "aspect-[15.5/9]" : ""}`
											: `w-full pb-16 md:pb-8 ${
													isVideo ? "aspect-[15.5/9]" : ""
											  }`
									}`}
									href={`artists/${artist.slug}/projects/${project.slug}`}
									key={project.slug}
								>
									{width > 768 && (
										<CustomCursor
											isHovering={isHovering}
											isActive={activeProject === project}
											variant={view === "thumbnail" ? "thumbnail" : "gallery"}
											label={project.title}
										/>
									)}
									<div className='relative w-full h-full'>
										{isVideo ? (
											<ReactPlayer
												className='bg-faded-5 object-fill w-full h-full before:content-[attr(data-content)] before:absolute before:inset-0 before:z-10 before:bg-primary before:opacity-0'
												url={firstImage.url}
												playing={
													isHovering && project.slug === activeProject?.slug
												}
												playsinline
												width='100%'
												height='100%'
												controls={false}
												muted={true}
												loop={true}
											/>
										) : (
											<CldImage
												className={`w-full h-full object-contain bg-faded-5`}
												src={firstImage.url}
												alt={`Photo by ${artist.name}`}
												sizes={
													view === "thumbnail"
														? "20vw"
														: "(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 80vw"
												}
												quality={70}
												width={firstImage.width}
												height={firstImage.height}
												priority={index < 8}
											/>
										)}
										<label className='absolute -bottom-8 left-0 bg-primary z-50 md:hidden'>
											{project.title}
										</label>
									</div>
								</Button>
							)
						})}
					</div>
				</section>
			</div>
		</Container>
	)
}
