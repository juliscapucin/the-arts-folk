import { PortableTextBlock } from "sanity"

export type Page = {
	title: string
	metadataDescription: string
	content: PortableTextBlock[]
}
