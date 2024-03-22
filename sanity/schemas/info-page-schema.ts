const infoPageSchema = {
	name: "infoPage",
	title: "Info Page",
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
			type: "array",
			of: [{ type: "block" }],
		},
		{
			name: "headerLink",
			title: "Header Link",
			description: "Select a header link to associate with this page.",
			type: "reference",
			to: [{ type: "header" }], // Ensure this type matches the name of your headerNavSchema
		},
		{
			name: "contactInfo",
			title: "Contact Info",
			type: "array",
			of: [
				{
					type: "document",
					fields: [
						{
							name: "name",
							type: "string",
							title: "Name",
						},
						{
							name: "email",
							type: "string",
							title: "Email",
						},
						{
							name: "phone",
							type: "string",
							title: "Phone",
						},
					],
				},
			],
		},
	],
}

export default infoPageSchema
