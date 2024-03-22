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
			type: "text",
		},
		{ name: "slug", title: "Slug", type: "slug" },
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
