"use client"

import { useState } from "react"
import { CldImage } from "next-cloudinary"
import ReactPlayer from "react-player/vimeo"

import { Artist, Project } from "@/types"
import { Button, Container, Heading } from "@/components/ui"
import { ArtistAside } from "@/components"

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
	const [view, setView] = useState("thumbnail")

	return (
		<Container hasPadding classes='pt-[--header-height-desktop]'>
			<div className='w-full'>
				<ArtistAside {...{ artist, sectionSlug, artistSections }} />

				<section className='relative ml-[50%] md:ml-[30%] xl:ml-[25%] w-1/2 md:w-9/12'>
					<header className='sticky top-8 pb-4 flex items-end justify-between bg-primary z-50'>
						<Heading tag='h1' classes='mt-16 leading-tightest'>
							{artist.name}
						</Heading>
						<button className='font-text text-labelLarge font-medium uppercase flex items-center gap-2'>
							<span>
								{view === "thumbnail" ? "Gallery View" : "Thumbnail View"}
							</span>
							<span className='border border-secondary w-6 h-6'></span>
						</button>
					</header>
					<div className='flex flex-wrap'>
						{projects.map((project) => {
							const firstImage = project.images[0]

							return (
								<Button
									classes='w-full md:w-1/3 xl:w-1/5 h-80 relative overflow-hidden p-2'
									href={`artists/${artist.slug}/projects/${project.slug}`}
									key={project.slug}
								>
									{/* <h2>{project.title}</h2> */}
									<div className='relative w-full h-full'>
										{firstImage.url.includes("vimeo") ? (
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
												className={`w-full h-full object-cover`}
												src={firstImage.url}
												alt={`Photo by hello`}
												sizes='20vw'
												quality={70}
												fill
											/>
										)}
									</div>
								</Button>
							)
						})}
					</div>
				</section>
			</div>
		</Container>
	)
}
