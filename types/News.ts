import type { ScrapbookImage } from "@/types"

export type News = {
	name: string
	slug: string
	description: string
	scrapbookImages: ScrapbookImage[]
	artistWebsite: string
}
