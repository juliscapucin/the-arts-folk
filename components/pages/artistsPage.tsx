"use client"

import { Artist } from "@/types/Artist"
import { Container } from "@/components/ui"
import { ArtistOverlay } from ".."

type ArtistsPageProps = {
	artists: Artist[]
}

export default function ArtistsPage({ artists }: ArtistsPageProps) {
	return (
		<Container classes='relative max-h-[--container-height-mobile] lg:max-h-[--container-height-desktop] overflow-y-scroll'>
			<ArtistOverlay />
			<section className='mx-auto space-y-16'>
				{artists.map((artist) => {
					return (
						<button className='block mx-auto h-16' key={artist.name}>
							{artist.name}
						</button>
					)
				})}
			</section>
		</Container>
	)
}
