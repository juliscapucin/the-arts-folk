const pageSchema = {
	name: "pages",
	title: "Pages",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "showTitle",
			title: "Show Title",
			type: "boolean",
			description:
				"Check this box to display the title on the page. Default is hidden.",
		},
		{ name: "metadataTitle", title: "Metadata Title", type: "string" },
		{
			name: "metadataDescription",
			title: "Metadata Description",
			type: "string",
			rows: 3,
		},
		{
			name: "metadataKeywords",
			title: "Metadata Keywords",
			type: "array",
			of: [{ type: "string" }],
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
			},
		},
		{
			name: "headerLink",
			title: "Header Link",
			description:
				"Select a header link to associate with this page if you'd like to add it to the header.",
			type: "reference",
			to: [{ type: "header" }], // Ensure this type matches the name of your headerNavSchema
		},
		{
			name: "content",
			title: "Content",
			type: "array",
			of: [{ type: "block" }],
		},
		{
			name: "addProjectsGallery",
			title: "Add Projects Gallery",
			type: "boolean",
			description: "Check this box to allow a projects gallery on this page.",
		},
	],
}

export default pageSchema
