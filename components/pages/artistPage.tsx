"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import ReactPlayer from "react-player/vimeo"

import gsap from "gsap"

import { useWindowDimensions } from "@/hooks"

import { Artist, ArtistSection, Project } from "@/types"
import { Button, Container, Heading, ImageWithSpinner } from "@/components/ui"
import { ArtistAside } from "@/components"
import { IconGallery, IconThumbnails } from "@/components/icons"
import { ButtonBack } from "@/components/buttons"

type artistPageProps = {
	artist: Artist
	projects: Project[]
	sectionSlug: string
	artistSections: ArtistSection[]
	startView: string
}

export default function ArtistPage({
	artist,
	projects,
	sectionSlug,
	artistSections,
	startView,
}: artistPageProps) {
	const [view, setView] = useState(startView)
	const [isHovering, setIsHovering] = useState(false)
	const [activeProject, setActiveProject] = useState<Project | null>(null)
	const imagesSectionRef = useRef<HTMLDivElement>(null)
	const changeViewButtonRef = useRef<HTMLButtonElement>(null)
	const buttonRefs = useRef<(HTMLAnchorElement | null)[]>([])

	const { width } = useWindowDimensions()

	const sortedProjects = artist.projects?.map((project) => {
		return projects.find((item) => item._id === project._ref)
	})

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
			setView(startView)
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
		<Container classes='pt-[--header-height-desktop]'>
			<div className='relative w-full'>
				{/* BACK BUTTON */}
				<ButtonBack href='/artists' label='Artists' classes='pt-8' />

				{/* MOBILE – HEADER */}
				<Heading tag='h1' classes='mt-4 mb-6 leading-tightest md:hidden'>
					{artist.name}
				</Heading>

				<section className='relative flex'>
					<ArtistAside {...{ artist, sectionSlug, artistSections }} />
					{/* DESKTOP – HEADER */}
					<div className='w-2/3 lg:w-3/4'>
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
						<div
							ref={imagesSectionRef}
							className='flex flex-wrap justify-start items-start'
						>
							{sortedProjects &&
								sortedProjects.map((project, index) => {
									if (!project || !project.images) return null
									const firstImage = project.images[0]
									const isVideo = firstImage.url.includes("vimeo")

									return (
										<Button
											ref={(el) => {
												buttonRefs.current[index] = el
											}}
											classes={`group relative cursor-pointer overflow-hidden ml-4 ${
												view === "gallery" ? "w-full" : "mb-4"
											}`}
											href={`artists/${artist.slug}/projects/${project.slug}`}
											key={`project.slug-${index}`}
										>
											<div
												className={`relative overflow-hidden ${
													view === "thumbnail"
														? `h-36 md:h-72 ${isVideo ? "aspect-[15.5/9]" : ""}`
														: `w-full pb-8 ${isVideo ? "aspect-[15.5/9]" : ""}`
												}`}
											>
												{isVideo ? (
													<ReactPlayer
														className='object-fill w-fit h-full before:content-[attr(data-content)] before:absolute before:inset-0 before:z-10 before:bg-primary before:opacity-0'
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
													<ImageWithSpinner
														classes='h-full w-auto overflow-hidden object-contain group-hover:scale-105 transition-transform duration-300'
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
											</div>
											{/* <label className='bg-primary block pt-2 z-50 md:hidden leading-tight'>
											{project.title}
										</label> */}
										</Button>
									)
								})}
						</div>
					</div>
				</section>
			</div>
		</Container>
	)
}
