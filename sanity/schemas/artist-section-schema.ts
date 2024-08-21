import { Rule as SanityRule } from "sanity"

const artistSectionSchema = {
	name: "artistSection",
	title: "Artist Page Sections",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "order",
			title: "Order (required)",
			type: "number",
			description: "Set the order for the artist section",
		},
	],
}

export default artistSectionSchema
