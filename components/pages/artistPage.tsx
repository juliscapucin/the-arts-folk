"use client"

import { notFound } from "next/navigation"
import { CldImage } from "next-cloudinary"
import ReactPlayer from "react-player/vimeo"

import { usePageContext } from "@/context"

import { Artist, Project } from "@/types"
import { Container } from "@/components/ui"
import { ArtistAside } from ".."

type artistPageProps = {
	artist: Artist
	projects: Project[]
	sectionSlug: string
}

export default function ArtistPage({
	artist,
	projects,
	sectionSlug,
}: artistPageProps) {
	const { transitionOnClick } = usePageContext()

	return (
		<Container hasPadding classes='pt-32'>
			<h1 className='text-headlineLarge mb-8'>{artist.name}</h1>
			<div className='flex w-full gap-8'>
				<ArtistAside {...{ artist, sectionSlug }} />
				<section className='w-9/12 flex flex-wrap gap-4'>
					{projects.map((project) => {
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
