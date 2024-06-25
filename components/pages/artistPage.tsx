"use client"

import { CldImage } from "next-cloudinary"
import ReactPlayer from "react-player/vimeo"

import { Artist, Category, Project } from "@/types"
import { Button, Container } from "@/components/ui"
import { ArtistAside, ArtistMenu } from ".."

type artistPageProps = {
	artist: Artist
	projects: Project[]
	sectionSlug: string
	artistSections: string[]
}

export default function ArtistPage({
	artist,
	projects,
	sectionSlug,
	artistSections,
}: artistPageProps) {
	return (
		<Container hasPadding classes='pt-32'>
			<h1 className='text-displaySmall mb-8'>{artist.name}</h1>
			<div className='flex w-full gap-8'>
				<ArtistAside {...{ artist, sectionSlug, artistSections }} />

				<section className='ml-[25%] w-9/12 flex flex-wrap gap-4'>
					{projects.map((project) => {
						const firstImage = project.images[0]

						return (
							<Button
								href={`artists/${artist.slug}/projects/${project.slug}`}
								classes={"w-2/12 overflow-hidden"}
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
							</Button>
						)
					})}
				</section>
			</div>
		</Container>
	)
}
