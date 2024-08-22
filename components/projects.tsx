"use client"

import { CldImage } from "next-cloudinary"
import ReactPlayer from "react-player/vimeo"

import { Artist } from "@/types"
import { Suspense } from "react"

type ProjectsProps = {
	artists: Artist[]
}

export default function Projects({ artists }: ProjectsProps) {
	return (
		<section className='mt-64 mb-16 space-y-8 max-w-desktop'>
			<ProjectsRow />
			<ProjectsRow />
			<ProjectsRow />
		</section>
	)
}

const ProjectsRow = () => {
	return (
		<div className='relative h-3/4 w-full flex flex-col md:flex-row gap-8 justify-between bg-faded-30'>
			<a
				href={"/projects/projects-1"}
				className='relative flex-1 min-w-[250px] max-w-[500px] aspect-[3/4] self-start'
			>
				<p className='font-script text-headlineLarge'>12.06.24</p>
				<ProjectsImage
					url='https://res.cloudinary.com/dwsipwsoc/image/upload/c_limit,w_1080/f_auto/q_50/v1718127568/Isaac_Marley_Morgan_Drakes_Danny_Fox_2000px_height_ny3h9m?_a=BAVAEyBy0'
					artistName='Marlen Mueller'
				/>
				<p className='absolute -bottom-2'>Avonté</p>
			</a>
			<a
				href={"/projects/projects-1"}
				className='relative flex-1 min-w-[250px] max-w-[500px] aspect-[3/4] self-end'
			>
				<p className='font-script text-headlineLarge'>12.06.24</p>
				<ProjectsImage
					url='https://res.cloudinary.com/dwsipwsoc/image/upload/c_limit,w_1080/f_auto/q_50/v1718127568/Isaac_Marley_Morgan_Drakes_Danny_Fox_2000px_height_ny3h9m?_a=BAVAEyBy0'
					artistName='Marlen Mueller'
				/>
				<p className='absolute -bottom-2'>Avonté</p>
			</a>
		</div>
	)
}

type ProjectsImageProps = {
	url: string
	artistName: string
}

const ProjectsImage = ({ url, artistName }: ProjectsImageProps) => {
	return (
		<div className=''>
			{url.includes("vimeo") ? (
				<Suspense fallback={null}>
					<ReactPlayer
						url={url}
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
					className={`object-contain`}
					src={url}
					alt={`Photo by ${artistName}`}
					sizes='(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 20vw'
					quality={70}
					fill
				/>
			)}
		</div>
	)
}
