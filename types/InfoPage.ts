import { PortableTextBlock } from "sanity"

export type InfoPage = {
	title: string
	metadataDescription: string
	content: PortableTextBlock[]
	contactInfo: {
		name: string
		email: string
		phone: string
	}[]
}
