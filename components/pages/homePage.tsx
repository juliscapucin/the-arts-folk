"use client"

import { Showreel } from "@/components"
import { Container } from "@/components/ui"
import type { CloudinaryImage } from "@/types"

type HomePageProps = {
	showreelImages: CloudinaryImage[]
}

export default function HomePage({ showreelImages }: HomePageProps) {
	return (
		<Container hasPadding={false}>
			<Showreel {...{ showreelImages }} />
		</Container>
	)
}
