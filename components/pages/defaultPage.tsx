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
			<div className='flex-1 lg:flex gap-32 justify-between items-start mt-16 lg:mt-32'>
				{/* Text */}
				<div className='lg:w-2/5 [&>p]:font-text [&>p]:font-extralight [&>p>a]:font-normal [&>h4, &>h3]:text-titleLarge [&>h2]:text-headlineLarge xl:w-1/3'>
					<Heading tag='h1' classes='mb-8' variant='display'>
						{pageData.title}
					</Heading>
					<PortableText value={pageData.content} />
				</div>
				<div className='flex flex-col justify-center items-center w-1/2 self-center'>
					{children}
				</div>
			</div>
			{hasCopyright && <Copyright />}
		</Container>
	)
}
