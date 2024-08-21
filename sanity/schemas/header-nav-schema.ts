import { Rule as SanityRule } from "sanity"

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
			title: "Order (required)",
			description: "Set the order for the header link",
			validation: (Rule: SanityRule) =>
				Rule.required().error("Order is required"),
		},
	],
}

export default headerNavSchema
