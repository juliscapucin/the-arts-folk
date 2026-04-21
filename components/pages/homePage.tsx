'use client'

import { ScrollTip, Showreel } from '@/components'

import type { CloudinaryImage } from '@/types'

type HomePageProps = {
	showreelImages: CloudinaryImage[]
	children?: React.ReactNode
}

export default function HomePage({ showreelImages, children }: HomePageProps) {
	return (
		<main>
			<ScrollTip />
			<Showreel {...{ showreelImages }} />
			{children}
		</main>
	)
}
