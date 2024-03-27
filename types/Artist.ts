import type { CloudinaryImage } from "@/types"

export type Artist = {
	name: string
	slug: string
	description: string
	scrapbookImages: CloudinaryImage[]
	artistWebsite: string
}
