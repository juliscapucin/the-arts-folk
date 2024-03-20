"use client"

import { Artist } from "@/types/Artist"

type ArtistsPageProps = {
	artists: Artist[]
}

export default function ArtistsPage({ artists }: ArtistsPageProps) {
	return <main>Artists</main>
}
