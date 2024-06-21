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
	const closeButtonRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		if (isFullscreenOpen) {
			// gsap.to("body", { overflow: "hidden" })
			gsap.to(projectFullscreenRef.current, {
				yPercent: 0,
				duration: 0.3,
				ease: "power2.out",
			})
			gsap.to(closeButtonRef.current, { opacity: 1, delay: 0.5 })
		} else {
			// gsap.to("body", { overflow: "auto" })
			gsap.to(projectFullscreenRef.current, {
				yPercent: 100,
				duration: 0.3,
				ease: "power2.in",
			})
			gsap.to(closeButtonRef.current, { opacity: 0 })
		}
	}, [isFullscreenOpen])

	useLayoutEffect(() => {
		if (!isFullscreenOpen) {
			gsap.set(projectFullscreenRef.current, { yPercent: 100 })
			gsap.set(closeButtonRef.current, { opacity: 0 })
		}
	}, [])

	function closeFullscreen() {
		setIsFullscreenOpen(false)
	}

	return (
		<>
			<div
				ref={closeButtonRef}
				className='fixed left-0 top-[--margin-desktop] right-[--margin-desktop] flex justify-end z-[301] pointer-events-none'
			>
				<ButtonClose
					color='primary'
					action={closeFullscreen}
					classes='mix-blend-difference'
				/>
			</div>
			<div
				ref={projectFullscreenRef}
				className='fixed top-0 left-0 w-screen h-screen overflow-y-auto space-y-8 bg-primary z-fullscreen'
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
