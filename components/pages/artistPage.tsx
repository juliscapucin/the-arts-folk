"use client"

import { useEffect, useRef, useState } from "react"
import { CldImage } from "next-cloudinary"
import ReactPlayer from "react-player/vimeo"

import gsap from "gsap"

import { Artist, Project } from "@/types"
import { Button, Container, Heading } from "@/components/ui"
import { ArtistAside, CustomCursor } from "@/components"

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
	const thumbnailButtonRef = useRef<HTMLAnchorElement>(null)
	const thumbnailButtonRefs = useRef<(HTMLAnchorElement | null)[]>([])

	useEffect(() => {
		if (!thumbnailButtonRefs.current) return

		const handleMouseEnter = (e: MouseEvent) => {
			setIsHovering(true)
			projects.forEach((project, index) => {
				if (thumbnailButtonRefs.current[index] === e.target) {
					setActiveProject(project)
				}
			})
		}

		const handleMouseLeave = () => {
			setIsHovering(false)
			// setActiveProject(null)
		}

		thumbnailButtonRefs.current.forEach((item) => {
			item?.addEventListener("mouseenter", handleMouseEnter)
		})
		thumbnailButtonRefs.current.forEach((item) => {
			item?.addEventListener("mouseleave", handleMouseLeave)
		})

		return () => {
			if (!thumbnailButtonRef.current) return
			thumbnailButtonRef.current.removeEventListener(
				"mouseenter",
				handleMouseEnter
			)
			thumbnailButtonRef.current.removeEventListener(
				"mouseleave",
				handleMouseLeave
			)
		}
	}, [thumbnailButtonRefs.current])

	const toggleView = () => {
		const tl = gsap.timeline({
			onComplete: () => {
				setView(view === "gallery" ? "thumbnail" : "gallery")
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
		) // "<" ensures both animations start at the same time
	}

	return (
		<Container hasPadding classes='pt-[--header-height-desktop]'>
			<div className='relative w-full'>
				<ArtistAside {...{ artist, sectionSlug, artistSections }} />

				<section className='relative ml-[50%] md:ml-[25%] w-1/2 md:w-9/12'>
					<header className='sticky top-8 pb-4 flex items-end justify-between bg-primary z-50'>
						<Heading tag='h1' classes='mt-16 pl-4 leading-tightest'>
							{artist.name}
						</Heading>
						<button
							ref={changeViewButtonRef}
							onClick={toggleView}
							className='font-text text-labelLarge font-medium uppercase flex items-center gap-2'
						>
							<span className='underlined-link hidden lg:block'>
								{view === "thumbnail" ? "Gallery View" : "Thumbnail View"}
							</span>
							{view === "thumbnail" ? (
								<div className='flex flex-col gap-[1px] -translate-y-[1px]'>
									<span className='border border-faded-70 w-[12px] h-[6px]'></span>
									<span className='border border-faded-70 w-[12px] h-[6px]'></span>
								</div>
							) : (
								<div className='space-y-[1px] -translate-y-[1px]'>
									<div className='flex gap-[1px]'>
										<span className='border border-faded-70 w-[6px] h-[6px]'></span>
										<span className='border border-faded-70 w-[6px] h-[6px]'></span>
									</div>
									<div className='flex gap-[1px]'>
										<span className='border border-faded-70 w-[6px] h-[6px]'></span>
										<span className='border border-faded-70 w-[6px] h-[6px]'></span>
									</div>
								</div>
							)}
						</button>
					</header>
					<div ref={imagesSectionRef} className='flex flex-wrap'>
						{projects.map((project, index) => {
							const firstImage = project.images[0]

							///////////////////
							// Thumbnail view
							///////////////////
							return view === "thumbnail" ? (
								<Button
									ref={(el) => {
										thumbnailButtonRefs.current[index] = el
									}}
									classes='h-72 relative overflow-hidden pl-4 pb-4'
									href={`artists/${artist.slug}/projects/${project.slug}`}
									key={project.slug}
								>
									{isHovering && project.slug === activeProject?.slug && (
										<CustomCursor
											isHovering={isHovering}
											variant='thumbnail'
											projectTitle={project.title}
										/>
									)}
									<div className='relative w-full h-full bg-faded-5'>
										{firstImage.url.includes("vimeo") ? (
											// <div className='relative pt-[56%]'>
											<ReactPlayer
												// className='absolute top-0 left-0'
												url={firstImage.url}
												playing
												playsinline
												width='100%'
												height='100%'
												controls={false}
												muted={true}
												loop={true}
											/>
										) : (
											// </div>
											<CldImage
												className={`w-full h-full object-contain`}
												src={firstImage.url}
												alt={`Photo by ${artist.name}`}
												sizes='20vw'
												quality={70}
												width={firstImage.width}
												height={firstImage.height}
												priority={index < 8}
											/>
										)}
									</div>
								</Button>
							) : (
								////////////////
								// Gallery view
								////////////////
								<Button
									classes={`w-full relative overflow-hidden pl-4 pb-8 bg-faded-5 ${
										firstImage.url.includes("vimeo") ?? "aspect-video"
									}`}
									href={`artists/${artist.slug}/projects/${project.slug}`}
									key={project.slug}
								>
									{/* <h2>{project.title}</h2> */}
									<div className={`relative w-full h-full bg-faded-5`}>
										{firstImage.url.includes("vimeo") ? (
											<ReactPlayer
												url={firstImage.url}
												playing
												playsinline
												height='100%'
												width='100%'
												controls={false}
												muted={true}
												loop={true}
											/>
										) : (
											<CldImage
												className={`w-full h-full object-cover`}
												src={firstImage.url}
												alt={`Photo by ${artist.name}`}
												sizes='100vw'
												quality={70}
												width={firstImage.width}
												height={firstImage.height}
											/>
										)}
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
