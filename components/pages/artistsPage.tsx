"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import gsap from "gsap"
import { Observer } from "gsap/Observer"

import { Artist } from "@/types/Artist"
import { Container } from "@/components/ui"
import { ArtistOverlay } from "@/components"

import { infiniteVerticalLoop } from "@/helpers"

type ArtistsPageProps = {
	artists: Artist[]
}

export default function ArtistsPage({ artists }: ArtistsPageProps) {
	const [isHovered, setIsHovered] = useState("")
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

		gsap.registerPlugin(Observer)

		// This context ensures that animations are scoped to the component and cleaned up when the component unmounts.
		ctx.add(() => {
			const items = gsap.utils.toArray(".gsap-scroll-item") as HTMLElement[]
			// Create an infinite vertical loop
			const loop = infiniteVerticalLoop(items, {
				repeat: -1,
				draggable: true,
				speed: 0.5,
				inertia: true,
				paused: false,
				center: true,
			})

			// Initially stop the loop.
			loop.timeScale(0)

			// Slow down to timeScale 1 over 2 seconds.
			const slow = gsap.to(loop, {
				timeScale: 1,
				duration: 2,
			})

			// Set up an Observer for user input.
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
					const MAX_TIME_SCALE = 1
					let finalTimeScale = Math.min(
						Math.max(MIN_TIME_SCALE, Math.abs(calculatedTimeScale)),
						MAX_TIME_SCALE
					)
					loop.timeScale(finalTimeScale)
				},
			})

			// Expose the slow animation control for external use.
			return { slow }
		}, sectionRef.current)

		return () => ctx.revert()
	}, [])

	useEffect(() => {
		if (isHovered === "") {
			ctx.slow?.resume()
		} else {
			ctx.slow?.pause()
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
				className='absolute w-full lg:space-y-16 py-8 z-20'
			>
				{artists.map((artist) => {
					return (
						<div className='gsap-scroll-item relative' key={artist.name}>
							<button
								className={`gsap-scroll-button block mx-auto h-64 lg:h-32 text-headlineSmall md:text-headlineMedium lg:text-headlineLarge transition-opacity duration-500 ${
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
									className={`block mt-2 font-text uppercase text-labelLarge transition-opacity ${
										isHovered === artist.name ? "" : "opacity-0"
									}`}
								>
									Coming soon
								</span>
							</button>
						</div>
					)
				})}
			</section>
		</Container>
	)
}
