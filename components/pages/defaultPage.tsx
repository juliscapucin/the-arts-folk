"use client"

import { PortableText } from "@portabletext/react"

import { Container, Heading } from "@/components/ui"

import type { Page } from "@/types"
import { Copyright } from "@/components"

type PageProps = {
	children?: React.ReactNode
	pageData: Page
	hasCopyright?: boolean
	contactInfo?: {
		name: string
		email: string
		phone: string
	}[]
}

export default function DefaultPage({
	pageData,
	children,
	hasCopyright,
}: PageProps) {
	return (
		<Container
			classes='relative pt-16 lg:pt-0 lg:flex flex-col justify-end'
			hasPadding={true}
		>
			<div className='flex-1 lg:flex gap-32 justify-between items-center'>
				{/* Text */}
				<div className='lg:w-2/5 [&>p]:font-text [&>p]:font-extralight [&>h4, &>h3]:text-titleLarge [&>h2]:text-headlineLarge'>
					<Heading tag='h1' classes='mt-16 lg:mt-32 mb-8' variant='display'>
						{pageData.title}
					</Heading>
					<PortableText value={pageData.content} />
				</div>
				{children}
			</div>
			{hasCopyright && <Copyright />}
		</Container>
	)
}
