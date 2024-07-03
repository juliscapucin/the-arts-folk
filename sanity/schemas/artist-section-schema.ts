const artistSectionSchema = {
	name: "artistSection",
	title: "Artist Page Sections / Links",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{ name: "order", title: "Order", type: "number" },
	],
}

export default artistSectionSchema
