import { PortableTextBlock } from "sanity"

export type InfoPage = {
	title: string
	description: PortableTextBlock[]
	contactInfo: {
		name: string
		email: string
		phone: string
	}[]
}
