import type { CloudinaryImage } from "@/types"

export type Project = {
	title: string
	artistName: string
	slug: string
	description: string
	images: CloudinaryImage[]
	artist: string
}
