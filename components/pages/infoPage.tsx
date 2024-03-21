"use client"

import { Container, Heading, Paragraph } from "@/components/ui"
import { Copyright } from "@/components"
import { ButtonEmail } from "@/components/buttons"

type InfoPageProps = {
	socialLinks?: { title: string; url: string }[]
}

export default function InfoPage({ socialLinks }: InfoPageProps) {
	return (
		<Container classes='relative pt-32 lg:pt-0 lg:flex flex-col justify-end'>
			{/* For Accessibility + SEO */}
			<Heading tag='h1' classes='lg:sr-only mb-8' variant='headline'>
				Info
			</Heading>
			<div className='flex-1 lg:flex gap-32 justify-between items-center'>
				{/* Text */}
				<div className='lg:w-2/5'>
					<Paragraph>
						The Arts Folk is an international photographic agency representing a
						diverse network of storytellers.
					</Paragraph>
					<Paragraph>
						Our Image-makers and directors operate as part of an interconnected
						and progressive cultural community, who seek to spark dialogue
						amongst curious minds.
					</Paragraph>
					<Paragraph>
						We offer seamless production & casting services at the highest level
						to create compelling visual content for Fashion, Beauty and
						Lifestyle brands across Europe.
					</Paragraph>
				</div>

				{/* Email + Phone */}
				<div className='lg:w-2/5 flex flex-col justify-center items-center gap-16 my-24 lg:my-0'>
					<ButtonEmail
						name={"Ruby Khatun"}
						email={"ruby@theartsfolk.com"}
						phone={"+44 7506 620021"}
					/>
					<ButtonEmail
						name={"Florian Pessenteiner"}
						email={"florian@theartsfolk.com"}
						phone={"+49 (0) 172 4585 976"}
					/>
				</div>
			</div>
			<Copyright />
		</Container>
	)
}
