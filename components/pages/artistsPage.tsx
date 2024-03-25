"use client"

import { Artist } from "@/types/Artist"
import { Container } from "@/components/ui"
import { ArtistOverlay } from ".."
import { useState } from "react"

type ArtistsPageProps = {
	artists: Artist[]
}

export default function ArtistsPage({ artists }: ArtistsPageProps) {
	const [isHovered, setIsHovered] = useState("")

	const handleMouseEnter = (name: string) => {
		setIsHovered(name)
	}

	return (
		<Container classes='relative max-h-[--container-height-mobile] lg:max-h-[--container-height-desktop] overflow-y-scroll'>
			<section className='absolute w-full lg:space-y-32 py-16 z-20'>
				{artists.map((artist) => {
					return (
						<>
							<ArtistOverlay
								images={artist.images}
								isVisible={isHovered === artist.name}
							/>
							<button
								className={`block mx-auto h-96 lg:h-32 text-headlineSmall md:text-headlineMedium lg:text-headlineLarge transition-opacity duration-300 ${
									isHovered === artist.name ? "" : "opacity-20"
								}`}
								key={artist.name}
								onMouseEnter={() => handleMouseEnter(artist.name)}
							>
								{artist.name}
								<span
									className={`block mt-2 font-text uppercase text-labelLarge transition-opacity ${
										isHovered === artist.name ? "" : "opacity-0"
									}`}
								>
									Coming soon
								</span>
							</button>
						</>
					)
				})}
			</section>
		</Container>
	)
}
