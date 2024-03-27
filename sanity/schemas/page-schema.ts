const pageSchema = {
	name: "page",
	title: "Page",
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
			},
		},
		{
			name: "headerLink",
			title: "Header Link",
			description:
				"Select a header link to associate with this page if you'd like to add it to the header.",
			type: "reference",
			to: [{ type: "header" }], // Ensure this type matches the name of your headerNavSchema
		},
		{
			name: "content",
			title: "Content",
			type: "array",
			of: [{ type: "block" }],
		},
	],
}

export default pageSchema
