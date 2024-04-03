import type { CloudinaryImage } from "@/types"

type ScrapbookImage = CloudinaryImage | { url: string }

export type Artist = {
	name: string
	slug: string
	description: string
	scrapbookImages: ScrapbookImage[]
	artistWebsite: string
}
