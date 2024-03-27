"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Observer } from "gsap/Observer"

import { Artist } from "@/types/Artist"
import { Container } from "@/components/ui"
import { ArtistOverlay } from "@/components"

import { infiniteVerticalLoop } from "@/helpers"
import Link from "next/link"

type ArtistsPageProps = {
	artists: Artist[]
}

export default function ArtistsPage({ artists }: ArtistsPageProps) {
	const [isHovered, setIsHovered] = useState("")
	const [loop, setLoop] = useState<gsap.core.Timeline | null>(null)
	const sectionRef = useRef<HTMLDivElement>(null)
	let ctx = gsap.context(() => {})

	const handleMouseEnter = (name: string) => {
		setIsHovered(name)
	}

	const handleMouseLeave = () => {
		setIsHovered("")
	}

	useLayoutEffect(() => {
		if (!sectionRef.current) return

		// This context ensures that animations are scoped to the component and cleaned up when the component unmounts.
		ctx.add(() => {
			const items = gsap.utils.toArray(".gsap-scroll-item") as HTMLElement[]
			// Create an infinite vertical loop
			setLoop(
				infiniteVerticalLoop(items, {
					repeat: -1,
					draggable: true,
					speed: 0.5,
					inertia: true,
					paused: false,
					center: true,
				})
			)

			// const loop = infiniteVerticalLoop(items, {
			// 	repeat: -1,
			// 	draggable: true,
			// 	speed: 0.5,
			// 	inertia: true,
			// 	center: true,
			// 	paused: false,
			// })

			// loop && loop.timeScale(0.5)
		}, sectionRef.current)

		return () => ctx.revert()
	}, [])

	useLayoutEffect(() => {
		gsap.registerPlugin(Observer)

		Observer.create({
			target: sectionRef.current,
			type: "pointer,touch,wheel",
			wheelSpeed: -1,
			onChange: (self) => {
				let calculatedTimeScale =
					Math.abs(self.deltaX) > Math.abs(self.deltaY)
						? -self.deltaX
						: -self.deltaY

				const MIN_TIME_SCALE = 1 // Define minimum and maximum time scale values
				const MAX_TIME_SCALE = 50

				let desiredTimeScale = Math.min(
					Math.max(MIN_TIME_SCALE, Math.abs(calculatedTimeScale)),
					MAX_TIME_SCALE
				)

				console.log(loop)

				// Set the loop's timeScale to the calculated value
				loop && loop.timeScale(desiredTimeScale)

				gsap.killTweensOf(loop, { timeScale: true })
				gsap.to(loop, {
					duration: 2, // Adjust the duration to control the deceleration speed.
					timeScale: 0.5, // Target timeScale to smoothly reduce to.
				})
			},
		})
	}, [loop])

	useEffect(() => {
		if (!loop) return

		if (isHovered === "") {
			loop.resume()
		} else {
			loop.pause()
		}
	}, [isHovered])

	return (
		<Container classes='relative max-h-[--container-height-mobile] lg:max-h-[--container-height-desktop] overflow-y-scroll'>
			{artists.map((artist) => {
				return (
					<ArtistOverlay
						key={`${artist.name}-overlay`}
						images={artist.images}
						isVisible={isHovered === artist.name}
					/>
				)
			})}
			<section
				ref={sectionRef}
				className='absolute w-full z-20 text-center space-y-24 pt-32'
			>
				{artists.map((artist) => {
					return (
						<div
							className='gsap-scroll-item relative text-center'
							key={artist.name}
						>
							<a
								href={artist.artistWebsite ? artist.artistWebsite : "#"}
								target='_blank'
								className={`gsap-scroll-button w-fit inline-block text-center h-24 text-headlineSmall md:text-headlineMedium lg:text-headlineLarge transition-opacity duration-500 ${
									isHovered === artist.name
										? ""
										: isHovered
										? "opacity-20 z-100"
										: ""
								}`}
								key={artist.name}
								onMouseEnter={() => handleMouseEnter(artist.name)}
								onMouseLeave={handleMouseLeave}
							>
								{artist.name}
								<span
									className={`block mt-2 font-text uppercase text-labelLarge font-normal transition-opacity ${
										isHovered === artist.name ? "" : "opacity-0"
									}`}
								>
									{artist.description}
								</span>
								<span
									className={`block mt-2 font-text uppercase text-labelMedium transition-opacity ${
										isHovered === artist.name ? "" : "opacity-0"
									}`}
								>
									Coming soon
								</span>
							</a>
						</div>
					)
				})}
			</section>
		</Container>
	)
}
