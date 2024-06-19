import type { ScrapbookImage } from "@/types"

type artistPageRef = {
	_type: "reference"
	_key: string
	_ref: string
}

export type News = {
	title: string
	subtitle: string
	projectInfo: string
	releaseDate: string
	slug: string
	description: string
	scrapbookImages: ScrapbookImage[]
	artistPage: artistPageRef
	images: {
		alt: string
		url: string
	}[]
}
