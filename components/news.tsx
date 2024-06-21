"use client"

import { CldImage } from "next-cloudinary"
import ReactPlayer from "react-player/vimeo"

import { CloudinaryImage, Project } from "@/types"

type NewsProps = {
	news: Project[]
}

export default function News({ news }: NewsProps) {
	return (
		<section className='relative mt-64 mb-16 w-full max-w-desktop flex flex-wrap'>
			{news.map((project) => {
				const aspectRatio = project.images[0].width / project.images[0].height

				const imageSizeSmall = aspectRatio > 1 ? "w-1/3" : "w-1/4"
				const imageSizeBig = aspectRatio > 1 ? "w-3/4" : "w-2/5"

				console.log(project.newsPageAlignment)

				return (
					<article
						className='relative basis-1/2 h-[70svh] flex justify-center items-center'
						key={project.slug}
					>
						<div
							className={`relative overflow-clip bg-faded-5 flex flex-col ${
								project.newsPageSize === "small" ? imageSizeSmall : imageSizeBig
							}`}
						>
							{/* Release Date */}
							<p className='block font-script text-displayMedium text-center'>
								{project.releaseDate}
							</p>

							{/* Project Image */}
							{project.images[0].url.includes("vimeo") ? (
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
							) : (
								<CldImage
									className='object-contain'
									src={project.images[0].url}
									alt={`Photo by ${project.artistInfo?.name}`}
									sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
									quality={70}
									width={project.images[0].width}
									height={project.images[0].height}
								/>
							)}

							{/* Project Info */}
							<p className='block text-center'>{project.title}</p>
							<p className='block text-center font-script text-headlineLarge capitalize'>
								By {project.artistInfo?.name}
							</p>
						</div>
					</article>
				)
			})}
		</section>
	)
}
