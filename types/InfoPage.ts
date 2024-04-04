import { PortableTextBlock } from "sanity"

export type InfoPage = {
	title: string
	metadataTitle: string
	metadataDescription: string
	content: PortableTextBlock[]
	contactInfo: {
		name: string
		email: string
		phone: string
	}[]
}
