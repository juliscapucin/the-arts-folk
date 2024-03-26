const cookiePageSchema = {
	name: "cookie",
	title: "Cookie Page",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "content",
			title: "Content",
			type: "array",
			of: [{ type: "block" }],
		},
	],
}

export default cookiePageSchema
