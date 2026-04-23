'use client'

import { SetStateAction, useCallback, useMemo, useRef, useState } from 'react'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { Observer } from 'gsap/Observer'

let mm = gsap.matchMedia()

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
	const [hoveredArtist, setHoveredArtist] = useState('')
	const [isScrolling, setIsScrolling] = useState(false)
	const [isScrollTipVisible, setIsScrollTipVisible] = useState(true)
	const [activeCategory, setActiveCategory] = useState('all')
	const sectionRef = useRef<HTMLDivElement>(null)
	const containerRef = useRef<HTMLDivElement>(null)

	const filteredArtists = useMemo(() => {
		if (activeCategory === 'all') return artists

		return artists.filter((artist) => {
			return (
				Array.isArray(artist.category) &&
				artist.category.some((category) => category._ref === activeCategory)
			)
		})
	}, [activeCategory, artists])

	const { handleTransitionOnClick } = usePageContext()
	useReloadOnResize()

	const handleMouseEnter = (name: string) => {
		setHoveredArtist(name)
	}

	const handleMouseLeave = () => {
		setHoveredArtist('')
	}

	const handleCategoryChange = useCallback(
		(nextCategoryValue: SetStateAction<string>) => {
			const nextCategory =
				typeof nextCategoryValue === 'function'
					? nextCategoryValue(activeCategory)
					: nextCategoryValue

			if (nextCategory === activeCategory) return

			setIsScrollTipVisible(true)
			setHoveredArtist('')
			setIsScrolling(false)

			if (!containerRef.current) {
				setActiveCategory(nextCategory)
				return
			}

			gsap.killTweensOf(containerRef.current)
			gsap.to(containerRef.current, {
				opacity: 0,
				duration: 0.3,
				onComplete: () => setActiveCategory(nextCategory),
			})
		},
		[activeCategory],
	)

	const getViewportPosition = useCallback((element: HTMLElement) => {
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
	}, [])

	// SCROLL LOOP
	const createScrollLoop = (isMobile: boolean) => {
		if (!sectionRef.current) return

		gsap.registerPlugin(Observer)

		const items = Array.from(sectionRef.current.children) as HTMLElement[]

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
				setIsScrollTipVisible((prev) => (prev ? false : prev))

				// Set the loop's timeScale to the desired value
				loop.timeScale(calculatedTimeScale)

				// Check if the element is in the middle of the viewport if the user is not scrolling fast
				if (isMobile && (self.velocityY! < -200 || self.velocityY! > 200)) {
					loop.eventCallback('onUpdate', () => {
						items.forEach((item) => {
							const position = getViewportPosition(item)
							position.isMiddle &&
								item.dataset.name &&
								setHoveredArtist(item.dataset.name)
						})
					})
				}

				// Decelerate
				slow.invalidate().restart()
			},
		})
	}

	// ENTRY ANIMATION
	useGSAP(() => {
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

				// If there is only one artist, animate entry without scroll loop
				if (filteredArtists.length === 1 && items.length > 0) {
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
						},
					)

					if (filteredArtists.length === 1 && isMobile) {
						setHoveredArtist(filteredArtists[0].name)
					}
					return
				}

				setIsScrollTipVisible((prev) => (prev ? prev : true))

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
						},
					)
				}
			},
			containerRef.current,
		)

		return () => {
			mm.revert()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [filteredArtists])

	return (
		<div className='artists-page relative'>
			<div
				className={`absolute mx-auto top-0 right-2 bottom-0 flex items-center transition-opacity duration-500 delay-300 z-100 ${
					isScrollTipVisible ? '' : 'opacity-0'
				}`}>
				<IconScroll />
			</div>
			{/* CATEGORY FILTER */}
			<CategoryFilter
				categories={categories}
				activeCategory={activeCategory}
				setActiveCategory={handleCategoryChange}
			/>
			<Container
				ref={containerRef}
				classes='artists-page relative max-h-[var(--container-height-mobile)] lg:max-h-[var(--container-height-desktop)] overflow-y-clip'>
				{/* ARTIST OVERLAY */}
				{filteredArtists.map((artist, index) => {
					return (
						<ArtistOverlay
							key={`${artist.name}-overlay`}
							images={artist.scrapbookImages}
							isVisible={hoveredArtist === artist.name && !isScrolling}
							index={index}
							artistName={artist.name}
						/>
					)
				})}

				{/* GRADIENTS */}
				<div
					className={`fixed top-[var(--header-height-mobile)] lg:top-[var(--header-height-desktop)] right-2 w-full h-32 ml-auto bg-gradient-to-b from-50% bg-gradient-middle from-primary to-transparent pointer-events-none z-50`}></div>
				<div
					className={`fixed bottom-[var(--footer-height-mobile)] lg:bottom-[var(--footer-height-desktop)] right-2 w-full h-32 ml-auto bg-gradient-to-t from-50% bg-gradient-middle from-primary to-transparent pointer-events-none z-50`}></div>

				{/* ARTISTS MENU */}
				<section
					ref={sectionRef}
					className={`w-full min-h-[var(--container-height-mobile)] text-center ${
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
									onClick={() =>
										handleTransitionOnClick(`artists/${artist.slug}`)
									}
									className={`gsap-scroll-button w-fit inline-block p-8 h-28 lg:h-16 min-w-[300px] font-heading text-center text-title-small md:text-title-medium lg:text-title-large transition-opacity duration-500 ${
										hoveredArtist === artist.name
											? ''
											: hoveredArtist // If another artist is hovered at all
												? 'opacity-10 -z-5 pointer-events-none lg:pointer-events-auto'
												: ''
									}`}
									key={artist.name}
									onMouseEnter={() => handleMouseEnter(artist.name)}
									onMouseLeave={handleMouseLeave}>
									{artist.name}
									<span
										className={`block mt-2 font-text uppercase text-label-large font-medium transition-opacity ${
											hoveredArtist === artist.name ? '' : 'opacity-0'
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
