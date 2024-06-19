import { Rule } from "sanity"

const newsSchema = {
	name: "news",
	title: "News",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "subtitle",
			title: "Subtitle",
			type: "string",
		},
		{
			name: "slug",
			title: "Slug",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
		},
		{
			name: "releaseDate",
			title: "Release Date",
			type: "date",
		},
		{
			name: "projectInfo",
			title: "Project Info",
			type: "string",
		},
		{
			name: "images",
			title: "Images",
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
			name: "artistPage",
			title: "Artist Page",
			description:
				"Select an artist page to associate with this page. If left blank, no artist page will be associated.",
			type: "reference",
			to: [{ type: "artist" }], // Ensure this type matches the name of your artistSchema
		},
	],
	orderings: [
		{
			title: "Release Date, New",
			name: "releaseDateDesc",
			by: [{ field: "releaseDate", direction: "desc" }],
		},
	],
}

export default newsSchema
