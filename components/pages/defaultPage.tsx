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
		>
			<div
				className={`relative flex-1 lg:flex gap-32 justify-between ${
					isCentered && "lg:items-center"
				}`}
			>
				{/* Text */}
				<div className='custom-rich-text custom-rich-text-page mt-16 lg:mt-0'>
					{pageData.title && (
						<Heading
							tag='h1'
							classes={`mb-8 ${!pageData.showTitle && "sr-only"}`}
						>
							{pageData.title}
						</Heading>
					)}
					{pageData.content && <PortableText value={pageData.content} />}
				</div>
				{isCentered && (
					<div className='flex flex-col justify-center items-center self-center h-full w-full lg:w-1/2'>
						{children}
					</div>
				)}
			</div>
			{!isCentered && children}
			{hasCopyright && <Copyright />}
		</Container>
	)
}
