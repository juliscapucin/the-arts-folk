const artistPageSchema = {
	name: "artistPage",
	title: "Artist Page",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "description",
			title: "Description",
			type: "text",
		},
		{ name: "slug", title: "Slug", type: "slug" },
	],
}

export default artistPageSchema
