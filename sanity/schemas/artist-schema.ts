const artistSchema = {
	name: "artist",
	title: "Artists",
	type: "document",
	fields: [
		{
			title: "Release Date",
			name: "releaseDate",
			type: "date",
		},
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
			name: "description",
			title: "Description",
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
			name: "content1",
			title: "Content 1",
			type: "array",
			of: [{ type: "block" }],
		},
		{
			name: "content2",
			title: "Content 2",
			type: "array",
			of: [{ type: "block" }],
		},
	],
	orderings: [
		{
			title: "Release Date, New",
			name: "releaseDateDesc",
			by: [{ field: "releaseDate", direction: "desc" }],
		},
	],
	preview: {
		select: {
			title: "title",
			media: "coverImage",
		},
	},
}

export default artistSchema
