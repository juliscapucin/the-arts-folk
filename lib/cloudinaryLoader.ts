interface CloudinaryLoaderParams {
	src: string
	width?: number
	quality?: string
}

export default function cloudinaryLoader({
	src,
	width,
	quality,
}: CloudinaryLoaderParams) {
	const q = quality || "auto"
	const w = width || 1000

	// Extract everything after "upload/" in the full URL
	const match = src.match(/\/upload\/(v\d+\/.+)/)

	if (!match) return src // fallback

	const [_, rest] = match

	const transformation = `f_auto,q_${q},w_${w}`

	return `https://res.cloudinary.com/dwsipwsoc/image/upload/${transformation}/${rest}`
}
