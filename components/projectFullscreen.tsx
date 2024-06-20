"use client"

import { use, useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"

import { CldImage } from "next-cloudinary"
import ReactPlayer from "react-player/vimeo"

import { CloudinaryImage } from "@/types"
import { ButtonClose } from "@/components/buttons"

type ProjectFullscreenProps = {
	images: CloudinaryImage[]
	isFullscreenOpen: boolean
	setIsFullscreenOpen: (arg0: boolean) => void
}

export default function ProjectFullscreen({
	images,
	isFullscreenOpen,
	setIsFullscreenOpen,
}: ProjectFullscreenProps) {
	const projectFullscreenRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		if (isFullscreenOpen) {
			// gsap.to("body", { overflow: "hidden" })
			gsap.to(projectFullscreenRef.current, { yPercent: 0, duration: 0.5 })
		} else {
			// gsap.to("body", { overflow: "auto" })
			gsap.to(projectFullscreenRef.current, { yPercent: -100, duration: 0.5 })
		}
	}, [isFullscreenOpen])

	useLayoutEffect(() => {
		!isFullscreenOpen &&
			gsap.set(projectFullscreenRef.current, { yPercent: -100 })
	}, [])

	function closeFullscreen() {
		setIsFullscreenOpen(false)
	}

	return (
		<>
			<div className='fixed z-[301]'>
				<ButtonClose
					color='primary'
					action={closeFullscreen}
					classes='mix-blend-difference'
				/>
			</div>
			<div
				ref={projectFullscreenRef}
				className='fixed top-0 left-0 w-screen h-screen overflow-y-auto z-fullscreen'
			>
				{images.map((image, index) =>
					image.url.includes("vimeo") ? (
						<ReactPlayer
							url={image.url}
							playing
							playsinline
							width='100%'
							height='100%'
							controls={false}
							muted={true}
							loop={true}
							key={`project-fullscreen-${index}`}
						/>
					) : (
						<CldImage
							className={`w-full object-contain`}
							src={image.url}
							alt={`Photo by hello`}
							sizes='100vw'
							quality={100}
							width={image.width}
							height={image.height}
							key={`project-fullscreen-${index}`}
						/>
					)
				)}
			</div>
		</>
	)
}
