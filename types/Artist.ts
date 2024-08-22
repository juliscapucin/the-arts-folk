import type { Reference, ScrapbookImage } from "@/types"

type CategoryArtist = {
	_ref: string
}

export type Artist = {
	_id: string
	name: string
	slug: string
	description: string
	artistInfo: string
	scrapbookImages: ScrapbookImage[]
	category: CategoryArtist[]
	artistWebsite: string
	artistInstagram: string
	agentEmail: string
	projects: Reference[]
	startView: boolean
}
