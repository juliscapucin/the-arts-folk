const artistSchema = {
	name: "artist",
	title: "Artists",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Name",
			type: "string",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "name",
				maxLength: 96,
			},
		},
		{
			name: "subtitle",
			title: "Subtitle",
			type: "text",
		},
		{
			name: "images",
			title: "Images",
			type: "array",
			description: "These images are served from Cloudinary",
			of: [
				{
					type: "cloudinary.asset",
				},
			],
		},
		{
			name: "category",
			title: "Categories",
			description: "Select the categories associated with this artist.",
			type: "array",
			of: [{ type: "reference", to: [{ type: "categories" }] }],
		},
		{ name: "artistWebsite", title: "Artist website", type: "url" },
		{
			name: "copy1",
			title: "Copy 1",
			type: "array",
			of: [{ type: "block" }],
		},
		{
			name: "copy2",
			title: "Copy 2",
			type: "array",
			of: [{ type: "block" }],
		},
	],
}

export default artistSchema
