"use client"

import { PortableText } from "@portabletext/react"

import { Container, Heading, Paragraph } from "@/components/ui"
import { Copyright } from "@/components"
import { ButtonEmail } from "@/components/buttons"

import { InfoPage } from "@/types"

type InfoPageProps = {
	info: InfoPage
}

export default function InfoPage({ info }: InfoPageProps) {
	return (
		<Container classes='relative pt-32 lg:pt-0 lg:flex flex-col justify-end'>
			{/* For Accessibility + SEO */}
			<Heading tag='h1' classes='lg:sr-only mb-8' variant='headline'>
				{info.title}
			</Heading>
			<div className='flex-1 lg:flex gap-32 justify-between items-center'>
				{/* Text */}
				<div className='lg:w-2/5'>
					<PortableText value={info.description} />
				</div>

				{/* Email + Phone */}
				<div className='lg:w-2/5 flex flex-col justify-center items-center gap-16 my-24 lg:my-0'>
					<ButtonEmail
						name={info.contactInfo[0].name}
						email={info.contactInfo[0].email}
						phone={info.contactInfo[0].phone}
					/>
				</div>
			</div>
			<Copyright />
		</Container>
	)
}
