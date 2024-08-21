import { Rule as SanityRule } from "sanity"

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
			title: "Order (required)",
			description: "Set the order for the footer link",
			validation: (Rule: SanityRule) =>
				Rule.required().error("Order is required"),
		},
	],
}

export default footerNavSchema
