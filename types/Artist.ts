import type { ScrapbookImage } from "@/types"
import type { Category } from "./Category"

export type Artist = {
	name: string
	slug: string
	description: string
	scrapbookImages: ScrapbookImage[]
	artistWebsite: string
	category: Category[]
}
