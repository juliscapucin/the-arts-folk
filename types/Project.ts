import type { CloudinaryImage, Artist } from "@/types"

type ArtistReference = {
	_ref: string
}

export type Project = {
	title: string
	slug: string
	projectInfo: string
	images: CloudinaryImage[]
	artist: ArtistReference
	artistInfo?: Artist
	releaseDate: string
	isNews: boolean
}
