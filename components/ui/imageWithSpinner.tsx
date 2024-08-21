import { CldImage, getCldImageUrl } from "next-cloudinary"

type ImageWithSpinnerProps = {
	classes: string
	src: string
	alt: string
	sizes: string
	quality: number
	width: number
	height: number
	priority?: boolean
}

export default async function ImageWithSpinner({
	classes,
	src,
	alt,
	sizes,
	quality,
	width,
	height,
	priority = false,
}: ImageWithSpinnerProps) {
	const imageUrl = getCldImageUrl({
		src: src,
		width: 10, // Resize the original file to a smaller size
	})
	const response = await fetch(imageUrl)
	const arrayBuffer = await response.arrayBuffer()
	const buffer = Buffer.from(arrayBuffer)
	const base64 = buffer.toString("base64")
	const dataUrl = `data:${response.type};base64,${base64}`

	return (
		<CldImage
			className={classes}
			src={src}
			alt={alt}
			sizes={sizes}
			quality={quality}
			width={width}
			height={height}
			priority={priority}
			placeholder='blur'
			blurDataURL={dataUrl}
		/>
	)
}
