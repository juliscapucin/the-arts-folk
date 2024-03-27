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
		},
		{ name: "order", type: "number", title: "Order" },
	],
}

export default footerNavSchema
