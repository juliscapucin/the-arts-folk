"use client"

import { useCallback, useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import { CldImage } from "next-cloudinary"
import ReactPlayer from "react-player/vimeo"

import { Button, Container } from "@/components/ui"

import { Project } from "@/types"

type NewsProps = {
	news: Project[]
}

function insertBlankProjects(projects: Project[]) {
	const result = []
	let counter = 0
	const pattern = [1, 6, 10, 12, 15, 20, 22, 27, 30, 35, 37]

	for (let i = 0; i < projects.length; i++) {
		if (pattern.includes(i + counter)) {
			result.push({
				title: "Blank Project",
				slug: `blank-${counter}`,
			})
			counter++
		}
		result.push(projects[i])
	}

	// Handle the case where pattern extends beyond the projects length
	for (let j = counter; j < pattern.length; j++) {
		result.push({
			title: "Blank Project",
			slug: `blank-${counter}`,
		})
		counter++
	}

	return result
}

export default function News({ news }: NewsProps) {
	const pathname = usePathname()
	const [projects, setProjects] = useState<Project[]>([])

	useEffect(() => {
		const blankProjects = insertBlankProjects(news)
		console.log(blankProjects)
		setProjects(blankProjects)
	}, [])

	return (
		<Container
			isSection
			classes={`relative mb-8 flex flex-wrap gap-y-24 mt-32`}
		>
			{projects.map((project, index) => {
				if (project.title === "Blank Project") {
					return (
						<article
							className='hidden md:block md:basis-1/4 w-full h-full bg-faded-5'
							key={`${project.slug}-${index}`}
						></article>
					)
				}

				if (project.images && project.images[0]) {
					const aspectRatio = project.images[0].width / project.images[0].height

					const imageSizeSmall = aspectRatio > 1 ? "w-[97%]" : "w-[97%]"
					const imageSizeBig = aspectRatio > 1 ? "w-[97%]" : "w-[97%]" // horizontal : vertical

					const isVideo = project.images[0].url.includes("vimeo")

					return (
						<article
							className={`relative basis-1/2 h-fit ${
								project.newsPageSize === "small"
									? "md:basis-1/4"
									: "md:basis-1/2"
							}`}
							key={project.slug}
						>
							<Button
								href={`/news/${project.slug}`}
								classes={`relative overflow-clip flex flex-col group ${
									isVideo
										? "w-full sm:w-[90%]"
										: project.newsPageSize === "small"
										? imageSizeSmall
										: imageSizeBig
								}`}
							>
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
								<p className='block mt-3 text-bodyMedium lg:text-bodyLarge leading-tight'>
									{/* <span>{index}. </span> */}
									{project.title}
								</p>
								<p className='block font-script text-titleLarge md:text-headlineMedium capitalize tracking-tighter'>
									By {project.artistInfo?.name}
								</p>
							</Button>
						</article>
					)
				}
			})}
		</Container>
	)
}
