import { PortableTextBlock } from "sanity"

export type InfoPage = {
	title: string
	content: PortableTextBlock[]
	contactInfo: {
		name: string
		email: string
		phone: string
	}[]
}
