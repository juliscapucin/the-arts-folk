const showreelSchema = {
	name: "showreel",
	title: "Showreel",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
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
	],
}

export default showreelSchema
