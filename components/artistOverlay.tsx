import { CldImage } from "next-cloudinary"

import type { CloudinaryImage } from "@/types"

type ArtistOverlayProps = {
	images: CloudinaryImage[]
	isVisible: boolean
	index: number
	artistName: string
}

type ArtistOverlayImageProps = {
	url: string
	isVisible: boolean
	classes?: string
	artistName: string
}

const ArtistOverlayImage = ({
	url,
	isVisible,
	classes,
	artistName,
}: ArtistOverlayImageProps) => {
	return (
		<div
			className={`relative w-[80%] lg:w-[50%] transition-opacity duration-700 ${classes} ${
				isVisible ? "" : "opacity-0"
			}`}
		>
			<CldImage
				className={`object-contain p-4`}
				src={url}
				alt={`Photo by ${artistName}`}
				sizes='(max-width: 768px) 50vw, (max-width: 1200px) 40vw, 40vw'
				quality={50}
				fill
			/>
		</div>
	)
}

export default function ArtistOverlay({
	images,
	isVisible,
	index,
	artistName,
}: ArtistOverlayProps) {
	return (
		<div
			className={`flex ${
				index % 2 === 0 ? "flex-row" : "flex-row-reverse"
			} fixed top-[--header-height-desktop] left-auto w-full py-8 pr-8 lg:p-8 max-w-desktop h-[--container-height-mobile] lg:h-[--container-height-desktop] justify-between pointer-events-none transition-opacity duration-500 z-80 mix-blend-multiply ${
				isVisible ? "" : "opacity-0"
			}`}
		>
			{/* LEFT */}
			<div className='relative w-[45%] lg:w-[40%] h-full flex flex-col gap-2 md:gap-4'>
				<div className='relative flex flex-col lg:flex-row w-full h-full lg:h-1/2 gap-4'>
					<ArtistOverlayImage
						url={images[0].url}
						classes='h-full self-end'
						isVisible={isVisible}
						artistName={artistName}
					/>

					<ArtistOverlayImage
						url={images[1].url}
						classes='h-full lg:top-32 delay-75'
						isVisible={isVisible}
						artistName={artistName}
					/>
				</div>

				<ArtistOverlayImage
					url={images[2].url}
					classes='h-1/2 delay-100'
					isVisible={isVisible}
					artistName={artistName}
				/>
			</div>

			{/* RIGHT */}
			<div className='relative w-[45%] lg:w-[40%] h-full flex flex-col lg:flex-row gap-4'>
				<ArtistOverlayImage
					url={images[3] ? images[3].url : images[0].url}
					classes='h-1/2 delay-150'
					isVisible={isVisible}
					artistName={artistName}
				/>

				<ArtistOverlayImage
					url={images[4] ? images[4].url : images[1].url}
					classes='h-1/2 self-end delay-200'
					isVisible={isVisible}
					artistName={artistName}
				/>
			</div>
		</div>
	)
}
