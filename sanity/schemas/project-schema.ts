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
	title: "Project",
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
					{ title: "Top, Left", value: "top-left", icon: "FaAlignLeft" },
					{ title: "Top, Center", value: "top-center", icon: "FaAlignCenter" },
					{ title: "Top, Right", value: "top-right", icon: "FaAlignRight" },
					{ title: "Center, Left", value: "center-left", icon: "FaAlignLeft" },
					{
						title: "Center, Center",
						value: "center-center",
						icon: "FaAlignJustify",
					},
					{
						title: "Center, Right",
						value: "center-right",
						icon: "FaAlignRight",
					},
					{ title: "Bottom, Left", value: "bottom-left", icon: "FaAlignLeft" },
					{
						title: "Bottom, Center",
						value: "bottom-center",
						icon: "FaAlignCenter",
					},
					{
						title: "Bottom, Right",
						value: "bottom-right",
						icon: "FaAlignRight",
					},
				],
				layout: "dropdown",
			},
			//TODO: Make icons work
			inputComponent: CustomSelect,
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
