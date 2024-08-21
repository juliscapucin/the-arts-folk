import { Rule } from "sanity"

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
			title: "Order",
			type: "number",
			description: "Set the order for the artist section",
			validation: (Rule: Rule) =>
				Rule.required()
					.min(1)
					.error("Order is required and must be at least 1"),
		},
	],
}

export default artistSectionSchema
