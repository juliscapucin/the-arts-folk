"use client"

import { useEffect, useLayoutEffect, useRef } from "react"
import gsap, { snap } from "gsap"
import ScrollTrigger from "gsap/ScrollTrigger"

import { Artist } from "@/types/Artist"
import { Container } from "@/components/ui"
import { ArtistOverlay } from ".."
import { useState } from "react"

import { infiniteVerticalLoop } from "@/helpers"

type ArtistsPageProps = {
	artists: Artist[]
}

export default function ArtistsPage({ artists }: ArtistsPageProps) {
	const [isHovered, setIsHovered] = useState("")
	const sectionRef = useRef<HTMLDivElement>(null)

	const handleMouseEnter = (name: string) => {
		setIsHovered(name)
	}

	const handleMouseLeave = () => {
		setIsHovered("")
	}

	useLayoutEffect(() => {
		if (!sectionRef.current) return
		let ctx = gsap.context(() => {
			const items = gsap.utils.toArray(".gsap-scroll-item") as HTMLElement[]
			infiniteVerticalLoop(items, {
				repeat: -1,
				speed: 1,
				paused: true,
				snap: 1,
				draggable: true,
				center: true,
				inertia: true,
			})
		}, sectionRef.current)

		return () => {
			ctx.revert()
		}
	}, [])

	return (
		<Container classes='relative max-h-[--container-height-mobile] lg:max-h-[--container-height-desktop] overflow-y-scroll'>
			<section
				ref={sectionRef}
				className='absolute w-full lg:space-y-16 py-32 z-20'
			>
				{artists.map((artist) => {
					return (
						<div className='gsap-scroll-item relative' key={artist.name}>
							{/* <ArtistOverlay
								images={artist.images}
								isVisible={isHovered === artist.name}
							/> */}
							<button
								className={`block mx-auto h-64 lg:h-32 text-headlineSmall md:text-headlineMedium lg:text-headlineLarge transition-opacity duration-500 ${
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
