"use client"

import { CldImage } from "next-cloudinary"
import ReactPlayer from "react-player/vimeo"

import { CloudinaryImage, Project } from "@/types"

type NewsProps = {
	news: Project[]
}

const options = [
	{
		title: "top-left",
		value: "items-start justify-start",
	},
	{
		title: "top-center",
		value: "items-start justify-center",
	},
	{
		title: "top-right",
		value: "items-start justify-end",
	},
	{
		title: "center-left",
		value: "items-center justify-start",
	},
	{
		title: "center-center",
		value: "justify-center items-center",
	},
	{
		title: "center-right",
		value: "items-center justify-end",
	},
	{
		title: "bottom-left",
		value: "items-end justify-start",
	},
	{
		title: "bottom-center",
		value: "items-end justify-center",
		icon: "FaAlignCenter",
	},
	{
		title: "bottom-right",
		value: "items-end justify-end",
	},
]

export default function News({ news }: NewsProps) {
	return (
		<section className='relative mt-64 mb-16 w-full max-w-desktop flex flex-wrap'>
			{news.map((project) => {
				const aspectRatio = project.images[0].width / project.images[0].height

				const imageSizeSmall =
					aspectRatio > 1 ? "w-2/3 md:w-1/3" : "w-2/3 md:w-1/4"
				const imageSizeBig =
					aspectRatio > 1 ? "w-2/3 md:w-3/4" : "w-2/3 md:w-2/5"

				const alignment = options.find((option) => {
					if (option.title === project.newsPageAlignment) {
						return option
					}
				})

				return (
					<article
						className={`relative py-12 md:py-0 md:basis-1/2 h-fit md:h-[65svh] flex ${
							alignment?.value ? alignment.value : "items-center justify-center"
						}`}
						key={project.slug}
					>
						<div
							className={`relative overflow-clip flex flex-col ${
								project.newsPageSize === "small" ? imageSizeSmall : imageSizeBig
							}`}
						>
							{/* Release Date */}
							<p className='block font-script text-headlineLarge md:text-displayMedium text-center'>
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
							<p className='block text-center font-script text-headlineSmall md:text-headlineLarge capitalize'>
								By {project.artistInfo?.name}
							</p>
						</div>
					</article>
				)
			})}
		</section>
	)
}
