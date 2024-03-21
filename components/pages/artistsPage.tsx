"use client"

import { Artist } from "@/types/Artist"
import { Container } from "@/components/ui"

type ArtistsPageProps = {
	artists: Artist[]
}

export default function ArtistsPage({ artists }: ArtistsPageProps) {
	return <Container>Artists</Container>
}
