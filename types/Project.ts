import type { CloudinaryImage } from "@/types"

export type Project = {
	title: string
	artistName: string
	slug: string
	projectInfo: string
	images: CloudinaryImage[]
	artist: string
	releaseDate: string
	isNews: boolean
}
