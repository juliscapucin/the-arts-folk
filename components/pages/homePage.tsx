"use client"

import { Showreel } from "@/components"
import { Container } from "@/components/ui"

const showreelImages = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"]

export default function HomePage() {
	return (
		<Container>
			<Showreel {...{ showreelImages }} />
		</Container>
	)
}
