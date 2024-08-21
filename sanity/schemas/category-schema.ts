import { Rule as SanityRule } from "sanity"

const categorySchema = {
	name: "categories",
	title: "Categories",
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
			description: "Set the order for the category",
			validation: (Rule: SanityRule) =>
				Rule.required().error("Order is required"),
		},
	],
}

export default categorySchema
