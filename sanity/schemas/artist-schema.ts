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
			name: "coverImage",
			title: "Cover Image",
			type: "document",
			fields: [
				{
					name: "fileName",
					type: "string",
					title: "Cloudinary File Name",
				},
				{
					name: "alt",
					type: "string",
					title: "Alt text",
				},
			],
		},
		{ name: "url", title: "URL", type: "url" },
		{
			name: "images",
			title: "Images",
			type: "array",
			of: [{ type: "string" }],
		},
		{
			name: "category",
			title: "Category",
			type: "array",
			of: [{ type: "string" }],
			options: {
				layout: "tags",
			},
		},
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
