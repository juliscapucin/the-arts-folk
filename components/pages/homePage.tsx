"use client"

import { Suspense } from "react"

import { Showreel } from "@/components"
import { Container } from "@/components/ui"

import type { CloudinaryImage } from "@/types"

type HomePageProps = {
	showreelImages: CloudinaryImage[]
}

export default function HomePage({ showreelImages }: HomePageProps) {
	return (
		<Container hasPadding={false}>
			<Suspense>
				<Showreel {...{ showreelImages }} />
			</Suspense>
		</Container>
	)
}
