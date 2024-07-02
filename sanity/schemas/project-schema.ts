import { Rule } from "sanity"

interface ProjectDocument {
	isNews?: boolean
}

interface PreviewSelection {
	title: string
	artistName: string
}

const projectSchema = {
	name: "project",
	title: "Projects / News",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title",
			type: "string",
		},
		{
			name: "artist",
			title: "Artist",
			description: "Select an artist to associate with this project.",
			type: "reference",
			to: [{ type: "artist" }], // Ensure this type matches the name of your artistSchema
		},
		{
			name: "artistSection",
			title: "Artist Section",
			description:
				"Select artist page section(s) / link(s) to associate with this project.",
			type: "array",
			of: [{ type: "reference", to: [{ type: "artistSection" }] }],
		},
		{
			name: "releaseDate",
			title: "Release Date",
			type: "date",
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
			name: "projectInfo",
			title: "Project Info",
			type: "string",
		},
		{
			name: "images",
			title: "Images",
			type: "array",
			description: "Served from Cloudinary or Vimeo",
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
		{ name: "isNews", title: "Show In News Page", type: "boolean" },
		{
			name: "newsPageSize",
			title: "News Page Image Size",
			type: "string",
			options: {
				list: [
					{ title: "Big", value: "big" },
					{ title: "Small", value: "small" },
				],
			},
			hidden: ({ document }: { document: ProjectDocument }) =>
				!document?.isNews,
		},
	],
	orderings: [
		{
			title: "Release Date, New",
			name: "releaseDateDesc",
			by: [{ field: "releaseDate", direction: "desc" }],
		},
	],
	preview: {
		select: {
			title: "title",
			artistName: "artist.name",
		},
		prepare(selection: PreviewSelection) {
			const { title, artistName } = selection
			return {
				title: `${artistName} - ${title}`,
			}
		},
	},
}

export default projectSchema
