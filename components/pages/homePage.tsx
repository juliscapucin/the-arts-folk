"use client"

import { Showreel } from "@/components"

const showreelImages = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"]

export default function HomePage() {
	return (
		<main>
			<Showreel {...{ showreelImages }} />
		</main>
	)
}
