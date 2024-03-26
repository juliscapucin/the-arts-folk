import { notFound } from "next/navigation"

import type { Artist } from "@/types"

// import { getArtist, getArtists } from "@/lib"
import { ArtistPage } from "@/components/pages"

type Params = {
	params: {
		slug: string
	}
}

// export async function generateMetadata({ params: { slug } }: Params) {
// 	const artistData = getArtist(slug)
// 	const artist = await artistData

// 	if (!artist) {
// 		return { title: "Artist Not Found", description: "Artist not found" }
// 	}

// 	return {
// 		title: artist.title,
// 		description: `${artist.category} – ${artist.title}`,
// 	}
// }

// const allArtistsData = getArtists()

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = params
	// const artistData = getArtist(slug)

	// const [artist, allArtists] = await Promise.all([artistData, allArtistsData])

	// if (!artist) return notFound()

	return <ArtistPage />
	// return <ArtistPage artist={artist} allArtists={allArtists} />
}

// SSG – Static Site Generation
// export async function generateStaticParams() {
// 	const artistData = getArtists()
// 	const artists: Artist[] = await artistData

// 	return artists.map((artist) => {
// 		return {
// 			artistSlug: artist.slug,
// 		}
// 	})
// }
