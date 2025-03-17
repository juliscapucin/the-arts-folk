import { Rule } from "sanity"

const artistSchema = {
	name: "artist",
	title: "Artists",
	type: "document",
	fields: [
		{
			name: "name",
			title: "Name (required)",
			type: "string",
			validation: (Rule: Rule) => Rule.required().error("Name is required"),
		},
		{
			name: "slug",
			title: "Slug (required)",
			type: "slug",
			options: {
				source: "name",
				maxLength: 96,
			},
			validation: (Rule: Rule) => Rule.required().error("Slug is required"),
		},
		{
			name: "description",
			title: "Description",
			type: "string",
		},
		{
			name: "category",
			title: "Categories (required)",
			type: "array",
			description: "Select the categories associated with this artist.",
			of: [{ type: "reference", to: [{ type: "categories" }] }],
			validation: (Rule: Rule) => Rule.required().error("Category is required"),
		},
		{
			name: "artistInfo",
			title: "Artist Info",
			type: "text",
		},
		{
			name: "scrapbookImages",
			title: "Scrapbook Images (minimum 5 required)",
			type: "array",
			description: "These images are served from Cloudinary or Vimeo",
			of: [
				{
					type: "cloudinary.asset",
				},
				{
					type: "object",
					name: "vimeoUrl",
					title: "Vimeo Video URL",
					fields: [
						{
							name: "url",
							title: "URL",
							type: "url",
							description: "Enter the Vimeo video URL",
							validation: (Rule: Rule) =>
								Rule.uri({
									scheme: ["https"],
									allowRelative: false,
								}),
						},
					],
				},
			],
			validation: (Rule: Rule) =>
				Rule.required()
					.min(5)
					.error("You must add at least 5 scrapbook images or videos"),
		},
		{
			name: "startView",
			title: "Start With Gallery View",
			type: "boolean",
			description:
				"Check if you want to start in Gallery View. Default is Thumbnail View.",
			options: {
				layout: "checkbox", // This creates a toggle button in the Sanity studio
			},
			initialValue: false, // Optional: Set an initial value if needed
		},
		{
			name: "projects",
			title: "Projects",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "project" }],
				},
			],
			options: {
				sortable: true,
			},
		},
		{ name: "artistWebsite", title: "Artist Website", type: "url" },
		{ name: "artistInstagram", title: "Artist Instagram", type: "url" },
		{ name: "agentEmail", title: "Agent email", type: "string" },
	],
}

export default artistSchema
