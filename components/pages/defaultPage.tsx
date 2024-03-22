"use client"

import { PortableText } from "@portabletext/react"

import { Container, Heading } from "@/components/ui"

import { Page } from "@/types"
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
			{/* For Accessibility + SEO */}
			<Heading
				tag='h1'
				classes='lg:sr-only mb-16 text-faded-50'
				variant='headline'
			>
				{pageData.title}
			</Heading>
			<div className='flex-1 lg:flex gap-32 justify-between items-center'>
				{/* Text */}
				<div className='lg:w-2/5 [&>p]:font-text [&>h4, &>h3]:text-titleLarge [&>h2]:text-headlineLarge'>
					<PortableText value={pageData.content} />
				</div>
				{children}
			</div>
			{hasCopyright && <Copyright />}
		</Container>
	)
}
