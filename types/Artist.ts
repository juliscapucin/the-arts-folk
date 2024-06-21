import type { ScrapbookImage } from "@/types"

type CategoryArtist = {
	_ref: string
}

export type Artist = {
	_id: string
	name: string
	slug: string
	description: string
	scrapbookImages: ScrapbookImage[]
	artistWebsite: string
	category: CategoryArtist[]
}
