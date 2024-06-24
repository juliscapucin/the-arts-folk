"use client"

import { CldImage } from "next-cloudinary"
import ReactPlayer from "react-player/vimeo"

import { usePageContext } from "@/context"

import { CloudinaryImage, Project } from "@/types"

type NewsProps = {
	news: Project[]
}

export default function News({ news }: NewsProps) {
	const { transitionOnClick } = usePageContext()

	return (
		<section className='relative mt-64 mb-32 w-full max-w-desktop flex flex-wrap'>
			{news.map((project) => {
				const aspectRatio = project.images[0].width / project.images[0].height

				console.log(project.newsPageAlignment)

				const imageSizeSmall =
					aspectRatio > 1 ? "w-2/3 md:w-1/3" : "w-2/3 md:w-1/4"
				const imageSizeBig =
					aspectRatio > 1 ? "w-2/3 md:w-1/2" : "w-2/3 md:w-2/5"

				return (
					<article
						className={`relative py-12 md:py-0 md:basis-1/2 h-fit md:h-[65svh] flex ${
							project.newsPageAlignment
								? project.newsPageAlignment
								: "items-center justify-center"
						}`}
						key={project.slug}
					>
						<button
							onClick={() => transitionOnClick(`news/${project.slug}`)}
							className={`relative overflow-clip flex flex-col ${
								project.newsPageSize === "small" ? imageSizeSmall : imageSizeBig
							}`}
						>
							{/* Release Date */}
							<p className='block font-script text-headlineLarge md:text-displayMedium text-center mx-auto'>
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
							<p className='block text-center mx-auto'>{project.title}</p>
							<p className='block text-center mx-auto font-script text-headlineSmall md:text-headlineLarge capitalize'>
								By {project.artistInfo?.name}
							</p>
						</button>
					</article>
				)
			})}
		</section>
	)
}
