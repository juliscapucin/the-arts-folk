import React from "react"
import { Rule } from "sanity"

const Separator = () => {
	return React.createElement("hr", {
		style: { borderBottom: "1px solid #ccc", margin: "20px 0" },
	})
}

interface ProjectDocument {
	isNews?: boolean
	showInProjectGallery?: boolean
	addToPage?: string[]
}

interface PreviewSelection {
	title: string
	artistName: string
}

const projectSchema = {
	name: "project",
	title: "Projects",
	type: "document",
	fields: [
		{
			name: "title",
			title: "Title (required)",
			type: "string",
			validation: (Rule: Rule) => Rule.required().error("Title is required"),
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
			title: "Release Date (required, used for News page ordering)",
			type: "date",
			validation: (Rule: Rule) =>
				Rule.required().error("Release Date is required"),
		},
		{
			name: "slug",
			title: "Slug (required)",
			description:
				"This will be used to generate the URL for this project. Must be unique and not contain spaces or special characters. Click 'generate' to use full title. (Ex: my-project-slug)",
			type: "slug",
			options: {
				source: "title",
				maxLength: 96,
			},
			validation: (Rule: Rule) => Rule.required().error("Slug is required"),
		},
		{
			name: "projectInfo",
			title: "Project Info",
			type: "string",
		},
		{
			name: "images",
			title: "Images (required)",
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
			validation: (Rule: Rule) => Rule.required().error("Images are required"),
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
		{
			name: "addSpaceBefore",
			title: "Add Space Before",
			type: "boolean",
			hidden: ({ document }: { document: ProjectDocument }) =>
				!document?.isNews,
		},
		{
			name: "addSpaceAfter",
			title: "Add Space After",
			type: "boolean",
			hidden: ({ document }: { document: ProjectDocument }) =>
				!document?.isNews,
		},
		{
			name: "separator",
			title: "Separator",
			type: "string",
			"components.input": Separator, // Custom component
			hidden: true, // Optional: Hide it from the schema's saved data
		},
		{
			name: "addToPage",
			title: "Add Project to Page(s)",
			description:
				"Select one or more pages where you'd like to show this project.",
			type: "array",
			of: [
				{
					type: "reference",
					to: [{ type: "pages" }],
				},
			],
		},
		{
			name: "projectsGallerySize",
			title: "Projects Gallery Image Size",
			type: "string",
			options: {
				list: [
					{ title: "Big", value: "big" },
					{ title: "Small", value: "small" },
				],
			},
			hidden: ({ document }: { document: ProjectDocument }) =>
				!document?.addToPage?.length,
		},
		{
			name: "addSpaceBeforeGallery",
			title: "Add Space Before",
			type: "boolean",
			hidden: ({ document }: { document: ProjectDocument }) =>
				!document?.addToPage?.length,
		},
		{
			name: "addSpaceAfterGallery",
			title: "Add Space After",
			type: "boolean",
			hidden: ({ document }: { document: ProjectDocument }) =>
				!document?.addToPage?.length,
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
