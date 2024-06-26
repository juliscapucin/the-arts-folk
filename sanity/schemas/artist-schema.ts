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
		},
		{
			name: "description",
			title: "Description",
			type: "string",
		},
		{
			name: "subtitle",
			title: "Subtitle",
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
			name: "category",
			title: "Categories",
			description: "Select the categories associated with this artist.",
			type: "array",
			of: [{ type: "reference", to: [{ type: "categories" }] }],
		},
		{ name: "artistWebsite", title: "Artist website", type: "url" },
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
