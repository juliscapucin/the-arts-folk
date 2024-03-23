import { CldImage } from "next-cloudinary"

export default function ArtistOverlay() {
	return (
		<>
			{/* DESKTOP */}
			<div className='flex fixed w-full pr-8 lg:p-8 max-w-desktop h-[--container-height-mobile] lg:h-[--container-height-desktop] justify-between pointer-events-none'>
				{/* LEFT */}
				<div className='relative w-[45%] lg:w-[40%] h-full flex flex-col gap-4'>
					<div className='relative flex flex-col lg:flex-row w-full h-full lg:h-1/2 gap-4'>
						<div className='relative w-[80%] lg:w-[50%] h-full self-end'>
							<CldImage
								className={`object-contain`}
								src='the-arts-folk/01.jpg'
								alt='photo'
								sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw'
								quality={50}
								fill
							/>
						</div>
						<div className='relative w-[80%] lg:w-[50%] h-full lg:top-32'>
							<CldImage
								className={`object-contain`}
								src='the-arts-folk/02.jpg'
								alt='photo'
								sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw'
								quality={50}
								fill
							/>
						</div>
					</div>
					<div className='relative w-[110%] lg:w-[50%] h-1/2 top:64'>
						<CldImage
							className={`object-contain`}
							src='the-arts-folk/horizontal.jpg'
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
							src='the-arts-folk/03.jpg'
							alt='photo'
							sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw'
							quality={50}
							fill
						/>
					</div>
					<div className='relative w-[80%] lg:w-[50%] h-1/2 self-end'>
						<CldImage
							className={`object-contain`}
							src='the-arts-folk/04.jpg'
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
