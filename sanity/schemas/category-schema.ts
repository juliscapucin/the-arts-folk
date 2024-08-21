import { Rule } from "sanity"

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
			title: "Order",
			type: "number",
			description: "Set the order for the category",
			validation: (Rule: Rule) =>
				Rule.required()
					.min(1)
					.error("Order is required and must be at least 1"),
		},
	],
	orderings: [
		{
			title: "Order by Custom Order",
			name: "customOrder",
			by: [{ field: "order", direction: "asc" }],
		},
	],
}

export default categorySchema
