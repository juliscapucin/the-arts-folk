"use client"

import { Suspense } from "react"

import { Showreel } from "@/components"
import { NewsServer } from "@/components/server"

import type { CloudinaryImage } from "@/types"
import { Container } from "@/components/ui"

type HomePageProps = {
	showreelImages: CloudinaryImage[]
}

export default function HomePage({ showreelImages }: HomePageProps) {
	return (
		<Container>
			<Suspense>
				<Showreel {...{ showreelImages }} />
			</Suspense>
			<NewsServer />
		</Container>
	)
}
