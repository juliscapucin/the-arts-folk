type VideoPlayerProps = {
	imageUrl: string
	isMuted: boolean
}

export default function VideoPlayer({ imageUrl, isMuted }: VideoPlayerProps) {
	const videoId = imageUrl.split("/").pop()

	return (
		<iframe
			className='w-full aspect-video flex justify-start'
			src={`https://player.vimeo.com/video/${videoId}?background=1&title=0&byline=0&portrait=0&muted=${isMuted ? 1 : 0}&autoplay=1&controls=0&loop=1&dnt=1`}
			allow='autoplay; fullscreen'
		/>
	)
}
