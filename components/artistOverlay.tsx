import { CldImage } from "next-cloudinary"

export default function ArtistOverlay() {
	return (
		<>
			{/* DESKTOP */}
			<div className='hidden md:flex fixed w-full p-8 max-w-desktop h-[--container-height-mobile] lg:h-[--container-height-desktop] justify-between z-10 pointer-events-none'>
				{/* LEFT */}
				<div className='relative w-[40%] h-full flex gap-4'>
					<div className='relative w-[50%] h-1/2'>
						<CldImage
							className={`object-contain`}
							src='the-arts-folk/01.jpg'
							alt='photo'
							sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw'
							quality={50}
							fill
						/>
					</div>
					<div className='relative w-[50%] h-1/2 self-center'>
						<CldImage
							className={`object-contain`}
							src='the-arts-folk/02.jpg'
							alt='photo'
							sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw'
							quality={50}
							fill
						/>
					</div>
					<div className='absolute w-[80%] lg:w-[50%] h-1/2 -bottom-24'>
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
				<div className='relative w-[40%] h-full flex flex-row gap-4'>
					<div className='relative w-[50%] h-1/2'>
						<CldImage
							className={`object-contain`}
							src='the-arts-folk/04.jpg'
							alt='photo'
							sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw'
							quality={50}
							fill
						/>
					</div>
					<div className='relative w-[50%] h-1/2 self-end'>
						<CldImage
							className={`object-contain`}
							src='the-arts-folk/05.jpg'
							alt='photo'
							sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw'
							quality={50}
							fill
						/>
					</div>
				</div>
			</div>
			{/* MOBILE */}
			<div className='flex md:hidden fixed w-full pr-8 max-w-desktop h-[--container-height-mobile] lg:h-[--container-height-desktop] justify-between z-10 pointer-events-none'>
				{/* LEFT */}
				<div className='relative w-[40%] h-full flex flex-col gap-4 '>
					<div className='relative w-[80%] h-1/2 self-start'>
						<CldImage
							className={`object-contain`}
							src='the-arts-folk/01.jpg'
							alt='photo'
							sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw'
							quality={50}
							fill
						/>
					</div>
					<div className='relative w-[80%] h-1/2 self-end'>
						<CldImage
							className={`object-contain`}
							src='the-arts-folk/02.jpg'
							alt='photo'
							sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw'
							quality={50}
							fill
						/>
					</div>
					<div className='relative w-[100%] lg:w-[50%] h-1/2'>
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
				<div className='relative w-[40%] h-full flex flex-col gap-4'>
					<div className='relative w-[80%] h-1/2'>
						<CldImage
							className={`object-contain`}
							src='the-arts-folk/04.jpg'
							alt='photo'
							sizes='(max-width: 768px) 50vw, (max-width: 1200px) 50vw, 50vw'
							quality={50}
							fill
						/>
					</div>
					<div className='relative w-[80%] h-1/2 self-end'>
						<CldImage
							className={`object-contain`}
							src='the-arts-folk/05.jpg'
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
