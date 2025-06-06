"use client"

import { Fragment } from "react"
import { usePathname } from "next/navigation"

import {
	Button,
	Container,
	ImageWithSpinner,
	VideoPlayer,
} from "@/components/ui"

import { Project } from "@/types"

type ProjectsGalleryProps = {
	projectsGallery: Project[]
}

export default function ProjectsGallery({
	projectsGallery,
}: ProjectsGalleryProps) {
	const pathname = usePathname()

	return (
		<section
			className={`relative mb-12 grid grid-cols-2 md:grid-cols-4 gap-x-4 mt-24 lg:mt-32 ${
				pathname !== "/production" && "gap-y-24"
			}`}
		>
			{projectsGallery.map((project) => {
				if (project.images && project.images[0]) {
					const isVideo = project.images[0].url.includes("vimeo")

					return (
						<Fragment key={project.slug}>
							{project.addSpaceBeforeGallery && (
								<article className='hidden md:block w-fit h-full'></article>
							)}
							<article
								className={`relative mb-24 md:mb-32 lg:mb-40 w-full ${
									project.projectsGallerySize === "small" ? "" : "md:col-span-2"
								}`}
							>
								<Button
									href={`${pathname}/${project.slug}`}
									classes='relative overflow-clip flex flex-col group w-full cursor-pointer'
									prefetch={false}
								>
									{/* Project Image */}
									<div className='overflow-clip'>
										{isVideo ? (
											<div className='w-full aspect-video group-hover:scale-110 transition-transform duration-200 ease-in-out before:content-[attr(data-content)] before:absolute before:inset-0 before:z-10 before:bg-primary before:opacity-0'>
												<VideoPlayer
													imageUrl={project.images[0].url}
													isMuted={true}
													autoplay={true}
												/>
											</div>
										) : (
											<ImageWithSpinner
												classes='object-contain group-hover:scale-110 transition-transform duration-300 ease-in-out'
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
									<p className='block mt-3 text-bodyMedium text-balance lg:text-bodyLarge leading-tight'>
										{project.title}
									</p>
									{pathname !== "/production" && (
										<p className='block font-script text-titleLarge md:text-headlineMedium capitalize tracking-tighter'>
											By {project.artistInfo?.name}
										</p>
									)}
								</Button>
							</article>
							{project.addSpaceAfterGallery && (
								<article className='hidden md:block md:basis-1/4 w-full h-full'></article>
							)}
						</Fragment>
					)
				}
			})}
		</section>
	)
}
