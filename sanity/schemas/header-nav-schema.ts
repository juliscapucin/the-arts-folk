import { Rule } from "sanity"

const headerNavSchema = {
	name: "header",
	title: "Header Links",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
		},
		{
			name: "order",
			type: "number",
			title: "Order",
			description: "Set the order for the header link",
			validation: (Rule: Rule) =>
				Rule.required()
					.min(1)
					.error("Order is required and must be at least 1"),
		},
	],
}

export default headerNavSchema
