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
		{ name: "order", type: "number", title: "Order" },
	],
}

export default headerNavSchema
