import { defineConfig } from "sanity"
import { deskTool } from "sanity/desk"
import schemas from "./sanity/schemas"
// import { visionTool } from '@sanity/vision';
// import schemas from '../sanity/schemas';

export default defineConfig({
	title: "The Arts Folk",

	projectId: "fqgs6dmb",
	dataset: "production",
	apiVersion: "2024-03-21",
	basePath: "/admin",
	plugins: [deskTool()],
	schema: { types: schemas },
})
