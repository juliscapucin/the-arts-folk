import { PortableTextBlock } from "sanity"

export type Page = {
	title: string
	metadataTitle: string
	metadataDescription: string
	metadataKeywords: string[]
	content: PortableTextBlock[]
}
