'use client'

import VimeoPlayer from '@vimeo/player'
import { useEffect, useRef } from 'react'

type VideoPlayerControlsProps = {
	videoUrl: string
	children: React.ReactNode
	autoplay?: boolean
}

export default function VideoPlayerControls({
	children,
	videoUrl,
	autoplay = false,
}: VideoPlayerControlsProps) {
	const videoPlayerRef = useRef<HTMLDivElement>(null)
	const videoId = videoUrl.split('/').pop()

	useEffect(() => {
		if (videoPlayerRef.current && videoId) {
			const iFrame = videoPlayerRef.current.childNodes[0] as HTMLIFrameElement

			// Create a new Vimeo player instance
			const player = new VimeoPlayer(iFrame, {
				id: +videoId, // Vimeo video ID as a number
				autoplay: autoplay,
				loop: true,
				muted: true,
				controls: false,
			})

			// Add event listeners or control the player
			player.on('play', () => {
				console.log('Video is playing!')
			})

			player.on('ended', () => {
				console.log('Video has ended.')
			})

			player.on('pause', () => {
				console.log('Video has paused.')
			})

			// Cleanup: Destroy the player on component unmount
			return () => {
				player.destroy()
			}
		}
	}, [])

	return <div ref={videoPlayerRef}></div>
}
