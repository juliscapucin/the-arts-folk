import { Page } from "@/types"

export type InfoPage = Page & {
	contactInfo: {
		name: string
		email: string
		phone: string
	}[]
}
