"use client"

import { CldImage } from "next-cloudinary"
import ReactPlayer from "react-player/vimeo"

import { Button } from "@/components/ui"

import { Project } from "@/types"
import { Suspense } from "react"

type NewsProps = {
	news: Project[]
}

const alignment = [
	"items-start justify-start", // 1
	"justify-center items-end xl:justify-start", // 2
	"items-center justify-center xl:items-center xl:justify-end", // 3
	"items-end justify-end xl:items-start xl:justify-center", // 4
	"items-start justify start xl:items-end xl:justify-center", // 5
	"items-center justify-center", // 6
	"items-center justify-start", // 7
	"items-end justify-center", // 8
	"items-start justify-end", // 9
	"items-center justify-center xl:items-center xl:justify-start", // 10
	"items-start justify-center xl:items-end xl:justify-center", // 11
	"items-end justify-end xl:items-center xl:justify-center", // 12
]

export default function News({ news }: NewsProps) {
	return (
		<section className='relative mt-32 mb-32 w-full max-w-desktop flex flex-wrap gap-y-4 md:gap-y-16 xl:gap-y-4'>
			{news.map((project, index) => {
				const aspectRatio = project.images[0].width / project.images[0].height

				const imageSizeSmall =
					aspectRatio > 1 ? "w-2/3 md:w-1/3" : "w-2/3 md:w-1/3 lg:w-1/4"
				const imageSizeBig =
					aspectRatio > 1
						? "w-2/3 md:w-[80%] xl:w-3/4"
						: "w-full sm:w-2/3 lg:w-[55%] xl:w-1/2" // horizontal : vertical

				return (
					<article
						className={`relative sm:basis-1/2 xl:basis-1/3 h-fit sm:h-[60svh] lg:h-[75svh] xl:h-[80svh] flex ${
							alignment.length > 2
								? alignment[index % alignment.length]
								: "items-center justify-center"
						}`}
						key={project.slug}
					>
						<Button
							href={`/news/${project.slug}`}
							classes={`relative overflow-clip flex flex-col ${
								project.newsPageSize === "small" ? imageSizeSmall : imageSizeBig
							}`}
						>
							{/* Release Date */}
							<p className='block font-script text-headlineLarge md:text-displayMedium text-center mx-auto'>
								{/* [{index + 1}]  */}
								{project.releaseDate}
							</p>

							{/* Project Image */}
							{project.images[0].url.includes("vimeo") ? (
								<Suspense fallback={null}>
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
								</Suspense>
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
							<p className='block text-center mt-3 mx-auto'>{project.title}</p>
							<p className='block text-center mx-auto font-script text-headlineSmall md:text-headlineLarge capitalize'>
								By {project.artistInfo?.name}
							</p>
						</Button>
					</article>
				)
			})}
		</section>
	)
}
