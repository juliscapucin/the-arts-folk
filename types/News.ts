import { CloudinaryImage } from "./CloudinaryImage"

type artistPageRef = {
	_type: "reference"
	_key: string
	_ref: string
}

export type News = {
	title: string
	subtitle: string
	projectInfo: string
	releaseDate: string
	slug: string
	description: string
	artistPage: artistPageRef
	images: CloudinaryImage[]
}
