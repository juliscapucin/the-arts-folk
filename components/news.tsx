"use client"

import { CldImage } from "next-cloudinary"
import ReactPlayer from "react-player/vimeo"

import { CloudinaryImage, Project } from "@/types"

type NewsProps = {
	news: Project[]
}

export default function News({ news }: NewsProps) {
	return (
		<section className='relative mt-64 mb-16 space-y-8 max-w-desktop md:flex items-start gap-8'>
			{news.map((project) => {
				console.log(project)
				return (
					<article
						className='relative w-full md:w-1/2 md:max-w-1/2 min-w-[200px] h-[60svh] flex flex-col bg-faded-10'
						key={project.slug}
					>
						<div className=''>
							<p className='font-script text-displayMedium text-center'>
								{project.releaseDate}
							</p>
							<NewsImage
								image={project.images[0]}
								artistName={
									project.artistInfo?.name || "The Arts Folk new project"
								}
							/>
							<p className='text-center'>{project.title}</p>
							<p className='text-center font-script text-headlineLarge capitalize'>
								By {project.artistInfo?.name}
							</p>
						</div>
					</article>
				)
			})}
		</section>
	)
}

type NewsImageProps = {
	artistName: string
	image: CloudinaryImage
}

const NewsImage = ({ artistName, image }: NewsImageProps) => {
	return (
		<div className='relative flex-1'>
			{image.url.includes("vimeo") ? (
				<ReactPlayer
					url={image.url}
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
					className={`object-contain`}
					src={image.url}
					alt={`Photo by ${artistName}`}
					sizes='(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 20vw'
					quality={70}
					width={image.width}
					height={image.height}
				/>
			)}
		</div>
	)
}
