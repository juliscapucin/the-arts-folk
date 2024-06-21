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
		if (!projectFullscreenRef.current || !closeButtonRef.current) return

		const mainElement = document.querySelector("main")

		if (isFullscreenOpen) {
			if (mainElement && !mainElement.classList.contains("overflow-clip"))
				document.documentElement.classList.add("overflow-clip")

			projectFullscreenRef.current.classList.remove("hidden")
			closeButtonRef.current.classList.remove("hidden")
			closeButtonRef.current!.classList.add("flex")

			gsap.to(projectFullscreenRef.current, {
				yPercent: 0,
				duration: 0.3,
				ease: "power2.out",
			})
			gsap.to(closeButtonRef.current, { opacity: 1, delay: 0.5 })
		} else {
			if (mainElement && mainElement.classList.contains("overflow-clip"))
				document.documentElement.classList.remove("overflow-clip")

			gsap.to(projectFullscreenRef.current, {
				yPercent: 100,
				duration: 0.3,
				ease: "power2.in",
				onComplete: () => {
					projectFullscreenRef.current!.classList.add("hidden")
					closeButtonRef.current!.classList.remove("flex")
					closeButtonRef.current!.classList.add("hidden")
				},
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
				className='fixed hidden left-0 top-[--margin-desktop] right-[--margin-desktop] justify-end z-[301]'
			>
				<ButtonClose
					color='primary'
					action={closeFullscreen}
					classes='mix-blend-difference'
				/>
			</div>
			<div
				ref={projectFullscreenRef}
				className='fixed hidden top-0 left-0 right-0 w-screen h-screen overflow-y-auto space-y-8 bg-primary z-fullscreen'
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