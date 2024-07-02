import type { CloudinaryImage, Artist, Reference } from "@/types"

export type Project = {
	_id: string
	title: string
	slug: string
	projectInfo?: string
	images?: CloudinaryImage[]
	artist?: Reference
	artistSection?: Reference[]
	artistInfo?: Artist
	releaseDate?: string
	isNews?: boolean
	newsPageSize?: string
	addSpaceBefore?: boolean
	addSpaceAfter?: boolean
}
