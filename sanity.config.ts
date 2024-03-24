import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import schemas from "./sanity/schemas"
import {
	cloudinaryAssetSourcePlugin,
	cloudinarySchemaPlugin,
	cloudinaryImageSource,
} from "sanity-plugin-cloudinary"

// import { visionTool } from '@sanity/vision';

export default defineConfig({
	title: "The Arts Folk",

	projectId: "fqgs6dmb",
	dataset: "production",
	apiVersion: "2024-03-21",
	basePath: "/admin",
	plugins: [
		structureTool(),
		cloudinaryAssetSourcePlugin(),
		cloudinarySchemaPlugin(),
	],
	schema: { types: schemas },
	form: {
		image: {
			assetSources: () => [cloudinaryImageSource],
			directUploads: false,
		},
	},
})
