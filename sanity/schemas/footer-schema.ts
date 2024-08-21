import { Rule } from "sanity"

const footerNavSchema = {
	name: "footer",
	title: "Footer Links",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "url",
			title: "Url",
			type: "url",
			description: "Use this field if link is external",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			description: "Use this field if link is internal",
		},
		{
			name: "order",
			type: "number",
			title: "Order",
			description: "Set the order for the footer link",
			validation: (Rule: Rule) =>
				Rule.required()
					.min(1)
					.error("Order is required and must be at least 1"),
		},
	],
}

export default footerNavSchema
