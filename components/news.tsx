"use client"

import { CldImage } from "next-cloudinary"
import ReactPlayer from "react-player/vimeo"

type NewsImageProps = {
	url: string
	artistName: string
}

export default function News() {
	return (
		<section className='mt-64 mb-16 space-y-8 max-w-desktop'>
			<NewsRow />
			<NewsRow />
			<NewsRow />
		</section>
	)
}

const NewsRow = () => {
	return (
		<div className='relative h-screen w-full flex flex-col md:flex-row gap-8 justify-between'>
			<a
				href={"/news/news-1"}
				className='relative flex-1 min-w-[250px] max-w-[500px] aspect-[3/4] self-start'
			>
				<p className=''>12.06.24</p>
				<NewsImage
					url='https://res.cloudinary.com/dwsipwsoc/image/upload/c_limit,w_1080/f_auto/q_50/v1718127568/Isaac_Marley_Morgan_Drakes_Danny_Fox_2000px_height_ny3h9m?_a=BAVAEyBy0'
					artistName='Marlen Mueller'
				/>
				<p className='absolute -bottom-2'>Avonté</p>
			</a>
			<a
				href={"/news/news-1"}
				className='relative flex-1 min-w-[250px] max-w-[500px] aspect-[3/4] self-end'
			>
				<p className=''>12.06.24</p>
				<NewsImage
					url='https://res.cloudinary.com/dwsipwsoc/image/upload/c_limit,w_1080/f_auto/q_50/v1718127568/Isaac_Marley_Morgan_Drakes_Danny_Fox_2000px_height_ny3h9m?_a=BAVAEyBy0'
					artistName='Marlen Mueller'
				/>
				<p className='absolute -bottom-2'>Avonté</p>
			</a>
		</div>
	)
}

const NewsImage = ({ url, artistName }: NewsImageProps) => {
	return (
		<div className=''>
			{url.includes("vimeo") ? (
				<ReactPlayer
					url={url}
					playing
					playsinline
					width='100%'
					height='100%'
					controls={false}
					muted={true}
					loop={true}
				/>
			) : (
				<CldImage
					className={`object-contain`}
					src={url}
					alt={`Photo by ${artistName}`}
					sizes='(max-width: 768px) 40vw, (max-width: 1200px) 20vw, 20vw'
					quality={70}
					fill
				/>
			)}
		</div>
	)
}
