"use client"

import { useRef, useState } from "react"
import Link from "next/link"
import { PortableText } from "@portabletext/react"

import gsap from "gsap"

import { Container, Heading } from "@/components/ui"
import { Page } from "@/types"

type CookiesProps = {
	cookieData: Page
}

export default function Cookies({ cookieData }: CookiesProps) {
	const [isOverlayOpen, setIsOverlayOpen] = useState(false)
	const overlayRef = useRef<HTMLDivElement>(null)

	const transitionOnClick = () => {
		if (!overlayRef.current) return

		let ctx = gsap.context(() => {
			gsap.to(overlayRef.current, {
				y: isOverlayOpen ? 0 : "-105.6%",
				duration: 0.5,
				ease: "power2.out",
			})
		}, overlayRef)

		setIsOverlayOpen(!isOverlayOpen)

		return () => {
			ctx.revert()
		}
	}
	return (
		<>
			<Container
				classes='absolute top-[--header-height-mobile] lg:top-[--header-height-desktop] left-0 right-0 flex items-end justify-end z-100 overflow-clip pointer-events-none'
				bgColor='transparent'
				isDiv={true}
				hasPadding={false}
			>
				<div className='space-x-4 bg-secondary text-primary p-4 pointer-events-auto'>
					<Link href='/' passHref legacyBehavior>
						<button
							onClick={(e) => {
								e.preventDefault()
								transitionOnClick()
							}}
							className='underlined-link uppercase font-text font-extralight text-bodyMedium tracking-wider text-primary select-none'
						>
							This site uses cookies
						</button>
					</Link>
					<button>OK</button>
				</div>
			</Container>

			{/* Cookie Policy overlay */}
			<Container
				classes='absolute top-[--container-height-mobile + --header-height-mobile] lg:top-[--container-height-desktop + --header-height-desktop] left-0 h-[--container-height-mobile] lg:h-[--container-height-desktop] z-80'
				isDiv={true}
				hasPadding={false}
				bgColor='transparent'
			>
				<div
					ref={overlayRef}
					className='w-full px-8 bg-primary h-[--container-height-mobile] lg:h-[--container-height-desktop] overflow-y-scroll'
				>
					<div className='custom-rich-text'>
						<Heading tag='h1' variant='headline' classes='mb-16 mt-16 lg:mt-32'>
							{cookieData.title}
						</Heading>
						<PortableText value={cookieData.content} />
					</div>
				</div>
			</Container>
		</>
	)
}
