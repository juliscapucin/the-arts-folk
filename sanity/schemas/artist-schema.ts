import { Rule } from "sanity"

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
			validation: (Rule: Rule) => Rule.required().error("Slug is required"),
		},
		{
			name: "description",
			title: "Description",
			type: "string",
		},
		{
			name: "category",
			title: "Categories",
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
			title: "Scrapbook Images",
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
