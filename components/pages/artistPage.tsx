"use client"

import { notFound } from "next/navigation"
import { CldImage } from "next-cloudinary"
import ReactPlayer from "react-player/vimeo"

import { usePageContext } from "@/context"

import { Artist, Project } from "@/types"
import { Container } from "@/components/ui"

type artistPageProps = {
	artist: Artist
	artistProjects: Project[]
}

export default function ArtistPage({
	artist,
	artistProjects,
}: artistPageProps) {
	const { transitionOnClick } = usePageContext()

	// console.log(artistProjects[0])

	return (
		<Container hasPadding classes='pt-32'>
			<h1 className='text-headlineLarge mb-8'>{artist.name}</h1>
			<div className='flex w-full gap-8'>
				<aside className='w-3/12 font-text'>
					<ul className='text-labelLarge font-medium'>
						<li className='underline'>Featured</li>
						<li>Portfolio</li>
						<li>Motion</li>
						<li>Personal</li>
					</ul>
					<p className='mt-8'>
						Isaac Marley Morgan is a London based photographer & art director
					</p>
					<a href='#'>Contact Agent</a>
					<a href='#'>Instagram</a>
				</aside>
				<section className='w-9/12 flex flex-wrap gap-4'>
					{artistProjects.map((project) => {
						const firstImage = project.images[0]

						return (
							<button
								onClick={() => transitionOnClick(project.slug)}
								className={"w-2/12 overflow-hidden"}
								key={project.slug}
							>
								{/* <h2>{project.title}</h2> */}
								<div>
									{project.images[0].url.includes("vimeo") ? (
										<ReactPlayer
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
										<CldImage
											className={`w-full object-contain`}
											src={firstImage.url}
											alt={`Photo by hello`}
											sizes='10vw'
											quality={70}
											width={firstImage.width}
											height={firstImage.height}
										/>
									)}
								</div>
							</button>
						)
					})}
				</section>
			</div>
		</Container>
	)
}
