"use client"

import { useLayoutEffect, useRef } from "react"

import { Showreel } from "@/components"
import { IconScrollDown } from "@/components/icons"

import type { CloudinaryImage } from "@/types"

type HomePageProps = {
	showreelImages: CloudinaryImage[]
	children?: React.ReactNode
}

export default function HomePage({ showreelImages, children }: HomePageProps) {
	const scrollTipRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				!scrollTipRef.current?.classList.contains("opacity-0") &&
					scrollTipRef.current?.classList.add("opacity-0")
			} else {
				scrollTipRef.current?.classList.contains("opacity-0") &&
					scrollTipRef.current?.classList.remove("opacity-0")
			}
		}

		window.addEventListener("scroll", handleScroll, { passive: true })
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<main>
			<div
				ref={scrollTipRef}
				className={`fixed mx-auto top-0 right-1 lg:right-6 h-screen pb-24 flex flex-col items-center justify-end gap-8 transition-opacity duration-500 delay-300 z-100`}
			>
				<span className='font-text -rotate-90 text-labelMedium md:text-labelLarge'>
					Scroll
				</span>
				<IconScrollDown />
			</div>
			<Showreel {...{ showreelImages }} />
			{children}
		</main>
	)
}
