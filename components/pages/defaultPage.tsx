"use client"

import { PortableText } from "@portabletext/react"

import { Container, Heading } from "@/components/ui"

import { Page } from "@/types"

type PageProps = {
	pageData: Page
}

export default function DefaultPage({ pageData }: PageProps) {
	return (
		<Container classes='relative pt-32 lg:pt-0 lg:flex flex-col justify-end'>
			{/* For Accessibility + SEO */}
			<Heading tag='h1' classes='lg:sr-only mb-8' variant='headline'>
				{pageData.title}
			</Heading>
			<div className='flex-1 lg:flex gap-32 justify-between items-center'>
				{/* Text */}
				<div className='lg:w-2/5 font-text'>
					<PortableText value={pageData.content} />
				</div>
			</div>
		</Container>
	)
}
