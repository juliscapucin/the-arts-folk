import { CldImage } from "next-cloudinary"

const artistOverlayImages = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"]

export default function ArtistOverlay() {
	return (
		<div className='fixed w-full pr-8 max-w-desktop h-[--container-height-mobile] lg:h-[--container-height-desktop] flex justify-between z-10 pointer-events-none'>
			{/* LEFT */}
			<div className='w-[40%] flex gap-4'>
				<div className='relative w-[50%]'>
					<CldImage
						className={`object-cover md:object-contain`}
						src='the-arts-folk/01.jpg'
						alt='photo'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
						quality={50}
						fill
					/>
				</div>
				<div className='relative w-[50%]'>
					<CldImage
						className={`object-cover md:object-contain`}
						src='the-arts-folk/02.jpg'
						alt='photo'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
						quality={50}
						fill
					/>
				</div>
			</div>

			{/* RIGHT */}
			<div className='w-[40%] flex gap-4'>
				<div className='relative w-[50%]'>
					<CldImage
						className={`object-cover md:object-contain`}
						src='the-arts-folk/03.jpg'
						alt='photo'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
						quality={50}
						fill
					/>
				</div>
				<div className='relative w-[50%]'>
					<CldImage
						className={`object-cover md:object-contain`}
						src='the-arts-folk/04.jpg'
						alt='photo'
						sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw'
						quality={50}
						fill
					/>
				</div>
			</div>
		</div>
	)
}
