'use client'

import {
	useCallback,
	useEffect,
	useLayoutEffect,
	useRef,
	useState,
} from 'react'

import gsap from 'gsap'
import { Observer } from 'gsap/Observer'

import { usePageContext } from '@/context'
import { useReloadOnResize } from '@/hooks'

import { ArtistOverlay, CategoryFilter } from '@/components'
import { IconScroll } from '@/components/icons'
import { Container } from '@/components/ui'

import { infiniteVerticalLoop } from '@/helpers'
import { GSAPQueries } from '@/utils'

import { Artist, Category } from '@/types'

type ArtistsPageProps = {
	artists: Artist[]
	categories: Category[]
}

export default function ArtistsPage({ artists, categories }: ArtistsPageProps) {
	const [isHovered, setIsHovered] = useState('')
	const [isScrollTipVisible, setIsScrollTipVisible] = useState(true)
	const [isScrolling, setIsScrolling] = useState(false)
	const [activeCategory, setActiveCategory] = useState('all')
	const [filteredArtists, setFilteredArtists] = useState<Artist[]>([])
	const sectionRef = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	const { transitionOnClick } = usePageContext()
	useReloadOnResize()

	let mm = gsap.matchMedia()

	const handleMouseEnter = (name: string) => {
		setIsHovered(name)
	}

	const handleMouseLeave = () => {
		setIsHovered('')
	}

	const getViewportPosition = useCallback(
		(element: HTMLElement) => {
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
		},
		[filteredArtists]
	)

	// SCROLL LOOP
	const createScrollLoop = (isMobile: boolean) => {
		if (!sectionRef.current) return

		gsap.registerPlugin(Observer)

		const items = gsap.utils.toArray('.gsap-scroll-item') as HTMLElement[]

		if (items.length === 0) return

		// Create an infinite vertical loop
		const loop = infiniteVerticalLoop(items, {
			repeat: -1,
		})

		// create a tween that'll always decelerate the timeScale of the timeline back to 0 over the course of 2 seconds (or whatever)
		let slow = gsap.to(loop, { timeScale: 0, duration: 1 })
		// make the loop stopped initially.
		loop.timeScale(0)

		// Create an observer to detect touch and wheel events
		Observer.create({
			target: sectionRef.current,
			type: 'pointer,touch,wheel',
			wheelSpeed: -1,
			onStop: () => {
				setIsScrolling(false)
			},
			onChangeY: (self) => {
				let calculatedTimeScale = -self.deltaY

				setIsScrolling(true)

				// Set the loop's timeScale to the desired value
				loop.timeScale(calculatedTimeScale)

				// Check if the element is in the middle of the viewport if the user is not scrolling fast
				if (isMobile && (self.velocityY! < -200 || self.velocityY! > 200)) {
					loop.eventCallback('onUpdate', () => {
						items.forEach((item) => {
							const position = getViewportPosition(item)
							position.isMiddle &&
								item.dataset.name &&
								setIsHovered(item.dataset.name)
						})
					})
				}

				// Decelerate
				slow.invalidate().restart()

				isScrollTipVisible && setIsScrollTipVisible(false)
			},
		})
	}

	// ENTRY ANIMATION
	useLayoutEffect(() => {
		if (!sectionRef.current || !containerRef.current || !filteredArtists) return

		mm.add(
			GSAPQueries,
			(context) => {
				const items = gsap.utils.toArray('.gsap-scroll-item') as HTMLElement[]
				let isMobile = context.conditions?.isMobile ?? false

				gsap.to(containerRef.current, {
					opacity: 1,
					duration: 0.3,
				})

				// If there are less than 4 artists, animate entry without scroll loop
				if (filteredArtists.length === 1 && items.length > 0) {
					setIsScrollTipVisible(false)
					gsap.fromTo(
						items,
						{
							yPercent: -500,
							opacity: 0,
						},
						{
							yPercent: 0,
							opacity: 1,
							duration: 0.6,
						}
					)

					if (filteredArtists.length === 1 && isMobile) {
						setIsHovered(filteredArtists[0].name)
					}
					return
				}

				if (!isScrollTipVisible) setIsScrollTipVisible(true)

				if (items.length > 0) {
					// Artist names entrance animation + scroll loop
					gsap.fromTo(
						items,
						{
							yPercent: -200,
							opacity: 0,
						},
						{
							yPercent: 0,
							opacity: 1,
							stagger: 0.07,
							duration: 0.6,
							onComplete: () => {
								createScrollLoop(isMobile)
							},
						}
					)
				}
			},
			containerRef.current
		)

		return () => {
			mm.revert()
		}
	}, [filteredArtists])

	useEffect(() => {
		if (!containerRef.current) return

		setIsHovered('')
		const filterArtists = () => {
			if (activeCategory === 'all') {
				setFilteredArtists(artists)
			} else {
				const filteredArtists = artists.filter((artist) => {
					return (
						Array.isArray(artist.category) &&
						artist.category.find((category) => category._ref === activeCategory)
					)
				})
				setFilteredArtists(filteredArtists)
			}
		}

		const ctx = gsap.context(() => {
			gsap.to(containerRef.current, {
				opacity: 0,
				duration: 0.3,
				onComplete: () => filterArtists(),
			})
		})

		return () => {
			ctx.revert()
		}
	}, [activeCategory])

	return (
		<div className='artists-page relative'>
			{/* ICON SCROLL */}
			<div
				className={`absolute mx-auto top-0 right-2 h-screen flex items-center transition-opacity duration-500 delay-300 z-100 ${
					isScrollTipVisible ? '' : 'opacity-0'
				}`}>
				<IconScroll />
			</div>
			{/* CATEGORY FILTER */}
			<CategoryFilter
				categories={categories}
				activeCategory={activeCategory}
				setActiveCategory={setActiveCategory}
			/>
			<Container
				ref={containerRef}
				classes='artists-page relative max-h-[--container-height-mobile] lg:max-h-[--container-height-desktop] overflow-y-clip'>
				{/* ARTIST OVERLAY */}
				{filteredArtists.map((artist, index) => {
					return (
						<ArtistOverlay
							key={`${artist.name}-overlay`}
							images={artist.scrapbookImages}
							isVisible={isHovered === artist.name && !isScrolling}
							index={index}
							artistName={artist.name}
						/>
					)
				})}

				{/* GRADIENTS */}
				<div
					className={`fixed top-[--header-height-mobile] lg:top-[--header-height-desktop] right-2 w-full h-32 ml-auto bg-gradient-to-b from-50% bg-gradient-middle from-primary to-transparent pointer-events-none z-50`}></div>
				<div
					className={`fixed bottom-[--footer-height-mobile] lg:bottom-[--footer-height-desktop] right-2 w-full h-32 ml-auto bg-gradient-to-t from-50% bg-gradient-middle from-primary to-transparent pointer-events-none z-50`}></div>

				{/* ARTISTS MENU */}
				<section
					ref={sectionRef}
					className={`w-full min-h-[--container-height-mobile] text-center ${
						filteredArtists.length < 4
							? 'flex flex-col justify-center items-center gap-24'
							: 'pt-10'
					}`}>
					{filteredArtists.map((artist) => {
						return (
							<div
								className='gsap-scroll-item text-center mt-20'
								key={artist.name}
								data-name={artist.name}>
								{/* TODO: add Button component */}
								<button
									onClick={() => transitionOnClick(`artists/${artist.slug}`)}
									className={`gsap-scroll-button w-fit inline-block p-8 h-28 lg:h-16 min-w-[300px] font-heading text-center text-titleSmall md:text-titleMedium lg:text-titleLarge transition-opacity duration-500 ${
										isHovered === artist.name
											? ''
											: isHovered // If another artist is hovered at all
												? 'opacity-10 -z-5 pointer-events-none lg:pointer-events-auto'
												: ''
									}`}
									key={artist.name}
									onMouseEnter={() => handleMouseEnter(artist.name)}
									onMouseLeave={handleMouseLeave}>
									{artist.name}
									<span
										className={`block mt-2 font-text uppercase text-labelLarge font-medium transition-opacity ${
											isHovered === artist.name ? '' : 'opacity-0'
										}`}>
										{artist.description}
									</span>
								</button>
							</div>
						)
					})}
				</section>
			</Container>
		</div>
	)
}
