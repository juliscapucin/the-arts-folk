const showreelSchema = {
	name: "showreel",
	title: "Showreel",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Name",
			type: "string",
		},
		{
			name: "showreelImage",
			title: "Showreel Image",
			type: "cloudinary.asset",
		},
		{
			name: "alt",
			title: "Alt Text",
			type: "string",
			description: "Please describe the image for screen readers",
		},
	],
}

export default showreelSchema
