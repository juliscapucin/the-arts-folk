import type { CloudinaryImage, Artist } from "@/types"

type Reference = {
	_ref: string
}

export type Project = {
	title: string
	slug: string
	projectInfo: string
	images: CloudinaryImage[]
	artist: Reference
	artistSection: Reference[]
	artistInfo?: Artist
	releaseDate: string
	isNews: boolean
	newsPageSize: string
	newsPageAlignment: string
}
