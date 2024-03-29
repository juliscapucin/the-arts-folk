"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Link from "next/link"

import gsap from "gsap"
import { Observer } from "gsap/Observer"

import { Artist } from "@/types/Artist"
import { Container } from "@/components/ui"
import { ArtistOverlay } from "@/components"

import { infiniteVerticalLoop } from "@/helpers"
import { useWindowDimensions } from "@/hooks"

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

	const createLoop = () => {
		if (!sectionRef.current) return
		gsap.registerPlugin(Observer)

		ctx.add(() => {
			const items = gsap.utils.toArray(".gsap-scroll-item") as HTMLElement[]
			// Create an infinite vertical loop

			const loop = infiniteVerticalLoop(items, {
				repeat: -1,
				draggable: true,
				speed: 0,
				inertia: true,
				paused: false,
			})
			// create a tween that'll always decelerate the timeScale of the timeline back to 0 over the course of 0.5 seconds (or whatever)
			let slow = gsap.to(loop, { timeScale: 0, duration: 2 })
			// make the loop stopped initially.
			loop.timeScale(0)

			Observer.create({
				target: sectionRef.current,
				type: "pointer,touch,wheel",
				wheelSpeed: -1,
				// onChange: (self) => {
				// 	loop.timeScale(
				// 		Math.abs(self.deltaX) > Math.abs(self.deltaY)
				// 			? -self.deltaX
				// 			: -self.deltaY
				// 	) // whichever direction is bigger
				// 	slow.invalidate().restart() // now decelerate
				// },
				onChange: (self) => {
					let calculatedTimeScale =
						Math.abs(self.deltaX) > Math.abs(self.deltaY)
							? -self.deltaX
							: -self.deltaY

					const MIN_TIME_SCALE = 0
					const MAX_TIME_SCALE = calculatedTimeScale > 0 ? 10 : -10

					let desiredTimeScale = Math.min(
						Math.max(MIN_TIME_SCALE, Math.abs(calculatedTimeScale)),
						MAX_TIME_SCALE
					)

					// Set the loop's timeScale to the desired value
					loop.timeScale(desiredTimeScale)
					slow.invalidate().restart() // now decelerate
				},
			})
		}, sectionRef.current)
	}

	useLayoutEffect(() => {
		if (!sectionRef.current) return

		createLoop()

		return () => ctx.revert()
	}, [])

	return (
		<Container classes='relative max-h-[--container-height-mobile] lg:max-h-[--container-height-desktop] overflow-y-scroll'>
			{artists.map((artist, index) => {
				return (
					<ArtistOverlay
						key={`${artist.name}-overlay`}
						images={artist.scrapbookImages}
						isVisible={isHovered === artist.name}
						index={index}
					/>
				)
			})}
			<section ref={sectionRef} className='absolute w-full text-center'>
				{artists.map((artist) => {
					return (
						<div className='gsap-scroll-item text-center' key={artist.name}>
							<a
								href={artist.artistWebsite ? artist.artistWebsite : "#"}
								target='_blank'
								className={`gsap-scroll-button w-fit inline-block p-8 h-16 min-w-[300px] text-center text-titleSmall md:text-titleMedium lg:text-titleLarge transition-opacity duration-500 ${
									isHovered === artist.name
										? ""
										: isHovered
										? "opacity-10 -z-5"
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
									className={`block mt-2 font-text uppercase text-labelMedium transition-opacity delay-75 ${
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
