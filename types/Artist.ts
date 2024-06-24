import type { ScrapbookImage } from "@/types"

export type Artist = {
	name: string
	slug: string
	description: string
	scrapbookImages: ScrapbookImage[]
	artistWebsite: string
}
