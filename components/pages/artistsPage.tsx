"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Link from "next/link"

import gsap from "gsap"
import { Observer } from "gsap/Observer"

import { ArtistOverlay } from "@/components"
import { IconScroll } from "@/components/icons"
import { Container } from "@/components/ui"

import { infiniteVerticalLoop } from "@/helpers"
import { GSAPQueries } from "@/utils"

import { Artist } from "@/types/Artist"

type ArtistsPageProps = {
	artists: Artist[]
}

export default function ArtistsPage({ artists }: ArtistsPageProps) {
	const [isHovered, setIsHovered] = useState("")
	const [isScrollTipVisible, setIsScrollTipVisible] = useState(true)
	const resizeTimeout = useRef<NodeJS.Timeout | null>(null)
	const sectionRef = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)
	let mm = gsap.matchMedia()

	const handleMouseEnter = (name: string) => {
		setIsHovered(name)
	}

	const handleMouseLeave = () => {
		setIsHovered("")
	}

	const createScrollLoop = (isMobile: boolean) => {
		if (!sectionRef.current) return
		gsap.registerPlugin(Observer)

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
			onChange: (self) => {
				let calculatedTimeScale =
					Math.abs(self.deltaX) > Math.abs(self.deltaY)
						? -self.deltaX
						: -self.deltaY

				const MIN_TIME_SCALE = 0
				const MAX_TIME_SCALE = isMobile
					? calculatedTimeScale > 0
						? 5
						: -5
					: calculatedTimeScale > 0
					? 8
					: -8

				let desiredTimeScale = Math.min(
					Math.max(MIN_TIME_SCALE, Math.abs(calculatedTimeScale)),
					MAX_TIME_SCALE
				)

				// Set the loop's timeScale to the desired value
				loop.timeScale(desiredTimeScale)
				slow.invalidate().restart() // now decelerate

				setIsScrollTipVisible(false)
			},
		})

		if (isMobile) {
			const getViewportPosition = (element: HTMLElement) => {
				const rect = element.getBoundingClientRect()
				const viewportHeight =
					window.innerHeight || document.documentElement.clientHeight
				const elementTop = rect.top
				const elementBottom = rect.bottom
				const screenMiddle = viewportHeight / 2
				return {
					isMiddle:
						Math.abs(elementTop) < screenMiddle &&
						Math.abs(elementBottom) > screenMiddle,
				}
			}

			loop.eventCallback("onUpdate", () => {
				items.forEach((item, i) => {
					const position = getViewportPosition(item)

					position.isMiddle &&
						item.dataset.name &&
						setIsHovered(item.dataset.name)
				})
			})
		}
	}

	useLayoutEffect(() => {
		if (!sectionRef.current || !containerRef.current) return

		mm.add(
			GSAPQueries,
			(context) => {
				const items = gsap.utils.toArray(".gsap-scroll-item") as HTMLElement[]
				let isMobile = context.conditions?.isMobile ?? false

				gsap.from(items, {
					yPercent: -100,
					opacity: 0,
					stagger: 0.07,
					duration: 0.5,
					onComplete: () => {
						createScrollLoop(isMobile)
					},
				})
			},
			containerRef.current
		)

		return () => {
			mm.revert()
		}
	}, [])

	// Reload the page on window resize
	useEffect(() => {
		function handleResize() {
			resizeTimeout.current && clearTimeout(resizeTimeout.current) // Clear previous timeout

			resizeTimeout.current = setTimeout(() => {
				window.location.reload()
				console.log("reload")
			}, 500)
		}

		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [resizeTimeout])

	return (
		<>
			{/* Icon Scroll */}
			<div
				className={`absolute mx-auto top-0 right-2 h-screen flex items-center transition-opacity duration-500 delay-300 z-100 ${
					isScrollTipVisible ? "" : "opacity-0"
				}`}
			>
				<IconScroll />
			</div>
			<Container
				ref={containerRef}
				classes='relative max-h-[--container-height-mobile] lg:max-h-[--container-height-desktop] overflow-y-scroll'
			>
				{/* Artist Overlay */}
				{artists.map((artist, index) => {
					return (
						<ArtistOverlay
							key={`${artist.name}-overlay`}
							images={artist.scrapbookImages}
							isVisible={isHovered === artist.name}
							index={index}
							artistName={artist.name}
						/>
					)
				})}

				{/* Gradients */}
				<div
					className={`fixed top-[--header-height-mobile] lg:top-[--header-height-desktop] right-2 w-full h-16 ml-auto bg-gradient-to-b from-50% bg-gradient-middle from-primary to-transparent z-50`}
				></div>
				<div
					className={`fixed bottom-[--footer-height-mobile] lg:bottom-[--footer-height-desktop] right-2 w-full h-32 ml-auto bg-gradient-to-t from-50% bg-gradient-middle from-primary to-transparent z-50`}
				></div>

				{/* Artists Menu */}
				<section
					ref={sectionRef}
					className='w-full text-center space-y-16 lg:space-y-3 pt-16 lg:pt-6'
				>
					{artists.map((artist) => {
						return (
							<div
								className='gsap-scroll-item text-center'
								key={artist.name}
								data-name={artist.name}
							>
								<a
									href={artist.artistWebsite ? artist.artistWebsite : "#"}
									target='_blank'
									className={`gsap-scroll-button w-fit inline-block p-8 h-16 min-w-[300px] text-center text-titleSmall md:text-titleMedium lg:text-titleLarge transition-opacity duration-500 ${
										isHovered === artist.name
											? ""
											: isHovered // If another artist is hovered at all
											? "opacity-10 -z-5 pointer-events-none lg:pointer-events-auto"
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
		</>
	)
}
