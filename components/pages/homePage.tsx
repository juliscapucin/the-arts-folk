"use client"

import { Suspense } from "react"

import { Showreel } from "@/components"
import { NewsServer } from "@/components/server"

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
			<NewsServer />
		</main>
	)
}
