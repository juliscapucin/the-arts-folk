import { defineConfig } from "sanity"
import { structureTool } from "sanity/structure"
import schemas from "./sanity/schemas"
import {
	cloudinaryAssetSourcePlugin,
	cloudinarySchemaPlugin,
} from "sanity-plugin-cloudinary"

export default defineConfig({
	title: "The Arts Folk",
	projectId: "fqgs6dmb",
	dataset: "production",
	apiVersion: "2022-06-30",
	basePath: "/admin",
	plugins: [
		structureTool(),
		cloudinaryAssetSourcePlugin(),
		cloudinarySchemaPlugin(),
	],
	schema: { types: schemas },
})
