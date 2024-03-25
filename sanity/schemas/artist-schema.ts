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
					type: "cloudinary.asset",
					name: "image",
					description: "This image is served from Cloudinary",
				},
				{
					name: "alt",
					type: "string",
					title: "Alt text",
					description: "Please describe the image for screen readers",
				},
			],
		},
		{ name: "artistWebsite", title: "Artist website", type: "url" },
		// {
		// 	name: "images",
		// 	title: "Images",
		// 	type: "array",
		// 	of: [{ type: "string" }],
		// },
		{
			type: "cloudinary.asset",
			name: "image",
			description: "This asset is served from Cloudinary",
		},
		{
			name: "category",
			title: "Categories",
			description: "Select the categories associated with this artist.",
			type: "array",
			of: [{ type: "reference", to: [{ type: "categories" }] }],
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
