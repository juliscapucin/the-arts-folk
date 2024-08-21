"use client"

import { Fragment } from "react"
import { usePathname } from "next/navigation"
import ReactPlayer from "react-player/vimeo"

import { Button, Container, ImageWithSpinner } from "@/components/ui"

import { Project } from "@/types"

type NewsProps = {
	news: Project[]
}

export default function News({ news }: NewsProps) {
	const pathname = usePathname()

	return (
		<Container
			isSection
			classes='relative mt-40 lg:mt-64 mb-12 grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-24'
		>
			{news.map((project, index) => {
				if (project.images && project.images[0]) {
					const isVideo = project.images[0].url.includes("vimeo")

					return (
						<Fragment key={project.slug}>
							{project.addSpaceBefore && (
								<article className='hidden md:block w-full h-full'></article>
							)}
							<article
								className={`relative h-fit w-full ${
									project.newsPageSize === "small" ? "" : "md:col-span-2"
								}`}
							>
								<Button
									href={`/news/${project.slug}`}
									classes='relative overflow-clip flex flex-col group w-full'
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
									<p className='block mt-3 text-bodyMedium lg:text-bodyLarge leading-tight'>
										{/* <span>{index}. </span> */}
										{project.title}
									</p>
									<p className='block font-script text-titleLarge md:text-headlineMedium capitalize tracking-tighter'>
										By {project.artistInfo?.name}
									</p>
								</Button>
							</article>
							{project.addSpaceAfter && (
								<article className='hidden md:block md:basis-1/4 w-full h-full'></article>
							)}
						</Fragment>
					)
				}
			})}
		</Container>
	)
}
