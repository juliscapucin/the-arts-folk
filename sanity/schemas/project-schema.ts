import { Rule } from "sanity"
import {
	FaAlignLeft,
	FaAlignCenter,
	FaAlignRight,
	FaAlignJustify,
} from "react-icons/fa"

import CustomSelect from "../components/CustomSelect"

interface ProjectDocument {
	isNews?: boolean
	// Add other fields as necessary
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
		{
			name: "newsPageAlignment",
			title: "News Page Image Alignment",
			type: "string",
			options: {
				list: [
					{
						title: "Top, Left",
						value: "items-start justify-start",
						icon: "FaAlignLeft",
					},
					{
						title: "Top, Center",
						value: "items-start justify-center",
						icon: "FaAlignCenter",
					},
					{
						title: "Top, Right",
						value: "items-start justify-end",
						icon: "FaAlignRight",
					},
					{
						title: "Center, Left",
						value: "items-center justify-start",
						icon: "FaAlignLeft",
					},
					{
						title: "Center, Center",
						value: "justify-center items-center",
						icon: "FaAlignJustify",
					},
					{
						title: "Center, Right",
						value: "items-center justify-end",
						icon: "FaAlignRight",
					},
					{
						title: "Bottom, Left",
						value: "items-end justify-start",
						icon: "FaAlignLeft",
					},
					{
						title: "Bottom, Center",
						value: "items-end justify-center",
						icon: "FaAlignCenter",
					},
					{
						title: "Bottom, Right",
						value: "items-end justify-end",
						icon: "FaAlignRight",
					},
				],
				layout: "dropdown",
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
}

export default projectSchema
