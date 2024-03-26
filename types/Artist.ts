import type { CloudinaryImage } from "@/types"

export type Artist = {
	name: string
	slug: string
	description: string
	images: CloudinaryImage[]
	artistWebsite: string
}
