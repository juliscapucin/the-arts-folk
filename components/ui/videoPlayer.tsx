"use client"

import { useEffect, useRef, useState } from "react"
import VimeoPlayer from "@vimeo/player"
import { set } from "sanity"

type VideoPlayerProps = {
	imageUrl: string
	isMuted: boolean
	autoplay: boolean
	play?: boolean
}

export default function VideoPlayer({
	imageUrl,
	isMuted,
	autoplay,
	play,
}: VideoPlayerProps) {
	const videoId = imageUrl.split("/").pop()
	const videoPlayerRef = useRef<HTMLDivElement>(null)
	const [isClient, setIsClient] = useState(false)
	let player: VimeoPlayer | null = null

	useEffect(() => {
		setIsClient(true)
	}, [])

	useEffect(() => {
		if (!videoPlayerRef.current || !videoId) return

		const iFrame = videoPlayerRef.current.childNodes[0] as HTMLIFrameElement

		player = new VimeoPlayer(iFrame, {
			id: +videoId, // Vimeo video ID as a number
			autoplay: autoplay,
			loop: true,
			muted: true,
			controls: false,
		})

		if (play) {
			player?.play()
		} else {
			player?.pause()
		}
	}, [play, videoPlayerRef, videoId, autoplay])

	return isClient ? (
		<div ref={videoPlayerRef}>
			<iframe
				src={`https://player.vimeo.com/video/${videoId}?background=1&title=0&byline=0&portrait=0&muted=${
					isMuted ? 1 : 0
				}&autoplay=${autoplay ? 1 : 0}&controls=0&loop=1&dnt=1`}
				allow='autoplay; fullscreen'
				style={{ width: "100%", aspectRatio: "16/9", border: "none" }}
			/>
		</div>
	) : (
		<></>
	)
}
