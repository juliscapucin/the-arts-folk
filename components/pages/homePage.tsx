"use client"

import { Suspense, useEffect, useRef, useState } from "react"

import { Showreel } from "@/components"
import { NewsServer } from "@/components/server"
import { IconScrollDown } from "@/components/icons"

import type { CloudinaryImage } from "@/types"

type HomePageProps = {
	showreelImages: CloudinaryImage[]
}

const Spinner = () => {
	return (
		<div className='relative w-[10%] min-w-12 aspect-square animate-spin'>
			<div className='absolute w-full h-full top-0 left-0 rounded-full border border-faded-5 border-r-secondary z-10'></div>
			<div className='absolute w-full h-full top-0 left-0 rounded-full border border-faded-30 opacity-20'></div>
		</div>
	)
}

export default function HomePage({ showreelImages }: HomePageProps) {
	const scrollTipRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 100) {
				!scrollTipRef.current?.classList.contains("opacity-0") &&
					scrollTipRef.current?.classList.add("opacity-0")
			} else {
				scrollTipRef.current?.classList.contains("opacity-0") &&
					scrollTipRef.current?.classList.remove("opacity-0")
			}
		}

		window.addEventListener("scroll", handleScroll)
		return () => window.removeEventListener("scroll", handleScroll)
	}, [])

	return (
		<main>
			{/* ICON SCROLL */}
			<div
				ref={scrollTipRef}
				className={`fixed mx-auto top-0 right-1 lg:right-6 h-screen pb-24 flex flex-col items-center justify-end gap-8 transition-opacity duration-500 delay-300 z-100`}
			>
				<span className='font-text -rotate-90'>Scroll</span>
				<IconScrollDown />
			</div>
			{/* TODO: add spinner */}
			<Suspense fallback={<Spinner />}>
				<Showreel {...{ showreelImages }} />
			</Suspense>
			<NewsServer />
		</main>
	)
}
