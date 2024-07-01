"use client"

import { PortableText } from "@portabletext/react"

import gsap from "gsap"

import { Container, Heading } from "@/components/ui"

import type { Page } from "@/types"
import { Copyright, PageTransition } from "@/components"

type PageProps = {
	children?: React.ReactNode
	pageData: Page
	hasCopyright?: boolean
	contactInfo?: {
		name: string
		email: string
		phone: string
	}[]
	isCentered?: boolean
}

export default function DefaultPage({
	pageData,
	children,
	hasCopyright,
	isCentered,
}: PageProps) {
	return (
		<Container
			classes={`default-page relative pt-16 lg:pt-0 lg:flex flex-col justify-end ${
				!isCentered && "lg:pt-32 lg:pb-16"
			}`}
			hasPadding={true}
		>
			<div
				className={`relative flex-1 lg:flex gap-32 justify-between min-h-full ${
					isCentered && "lg:items-center"
				}`}
			>
				{/* Text */}
				<div className='custom-rich-text custom-rich-text-page mt-16 lg:mt-0'>
					<Heading tag='h1' classes='sr-only mb-8' variant='headline'>
						{pageData.title}
					</Heading>
					<PortableText value={pageData.content} />
				</div>
				<div className='flex flex-col justify-center items-center self-center h-full w-full lg:w-1/2'>
					{children}
				</div>
			</div>
			{hasCopyright && <Copyright />}
		</Container>
	)
}
