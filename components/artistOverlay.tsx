import { CldImage } from "next-cloudinary"

import { CloudinaryImage } from "@/types"

type ArtistOverlayProps = {
	images: CloudinaryImage[]
	isVisible: boolean
}

export default function ArtistOverlay({
	images,
	isVisible,
}: ArtistOverlayProps) {
	return (
		<>
			{/* DESKTOP */}
			<div
				className={`flex fixed -top-[--header-height-mobile] left-0 w-full pr-8 lg:p-8 max-w-desktop h-[--container-height-mobile] lg:h-[--container-height-desktop] justify-between pointer-events-none transition-opacity duration-500 ${
					isVisible ? "" : "opacity-0"
				}`}
			>
				{/* LEFT */}
				<div className='relative w-[45%] lg:w-[40%] h-full flex flex-col gap-4'>
					<div className='relative flex flex-col lg:flex-row w-full h-full lg:h-1/2 gap-4'>
						<div className='relative w-[80%] lg:w-[50%] h-full self-end'>
							<CldImage
								className={`object-contain`}
								src={images[0].url}
								alt='photo'
								sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw'
								quality={50}
								fill
							/>
						</div>
						<div className='relative w-[80%] lg:w-[50%] h-full lg:top-32'>
							<CldImage
								className={`object-contain`}
								src={images[1].url}
								alt='photo'
								sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw'
								quality={50}
								fill
							/>
						</div>
					</div>
					<div className='relative w-[110%] lg:w-[50%] h-1/2'>
						<CldImage
							className={`object-contain`}
							src={images[2].url}
							alt='photo'
							sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw'
							quality={50}
							fill
						/>
					</div>
				</div>

				{/* RIGHT */}
				<div className='relative w-[45%] lg:w-[40%] h-full flex flex-col lg:flex-row gap-4'>
					<div className='relative w-[80%] lg:w-[50%] h-1/2'>
						<CldImage
							className={`object-contain`}
							src={images[3] ? images[3].url : images[0].url}
							alt='photo'
							sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw'
							quality={50}
							fill
						/>
					</div>
					<div className='relative w-[80%] lg:w-[50%] h-1/2 self-end'>
						<CldImage
							className={`object-contain`}
							src={images[4] ? images[4].url : images[1].url}
							alt='photo'
							sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw'
							quality={50}
							fill
						/>
					</div>
				</div>
			</div>
		</>
	)
}
