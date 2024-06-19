"use client"

import { Suspense } from "react"

import { News, Showreel } from "@/components"
import { Container } from "@/components/ui"

import type { CloudinaryImage } from "@/types"

type HomePageProps = {
	showreelImages: CloudinaryImage[]
}

export default function HomePage({ showreelImages }: HomePageProps) {
	return (
		<main>
			<Suspense>
				<Showreel {...{ showreelImages }} />
			</Suspense>
			<News />
		</main>
	)
}
