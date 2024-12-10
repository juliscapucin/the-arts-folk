import { PortableTextBlock } from "sanity"

export type Page = {
	title: string
	showTitle: boolean
	metadataTitle: string
	metadataDescription: string
	metadataKeywords: string[]
	content: PortableTextBlock[]
	addProjectsGallery: boolean
}
