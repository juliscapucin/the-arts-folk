"use client"

import { Container, Heading, NavbarSocials, Paragraph } from "@/components/ui"
import { Copyright } from "@/components"
import { ButtonEmail } from "@/components/buttons"

type InfoPageProps = {
	socialLinks: { title: string; url: string }[]
}

export default function InfoPage({ socialLinks }: InfoPageProps) {
	return (
		<Container classes='lg:flex gap-32 justify-between items-center pt-32 lg:pt-0'>
			{/* For Accessibility + SEO */}
			<Heading tag='h1' classes='lg:sr-only' variant='headline'>
				Info
			</Heading>
			<div className='lg:w-2/5'>
				<Paragraph>
					The Arts Folk is an international photographic agency representing a
					diverse network of storytellers.
				</Paragraph>
				<Paragraph>
					Our Image-makers and directors operate as part of an interconnected
					and progressive cultural community, who seek to spark dialogue amongst
					curious minds.
				</Paragraph>
				<Paragraph>
					We offer seamless production & casting services at the highest level
					to create compelling visual content for Fashion, Beauty and Lifestyle
					brands across Europe.
				</Paragraph>
			</div>
			<div className='lg:w-2/5'>
				<ButtonEmail name={"Ruby Khatun"} email={"ruby@theartsfolk.com"} />
				<ButtonEmail
					name={"Florian Pessenteiner"}
					email={"florian@theartsfolk.com"}
				/>
				<Copyright />
			</div>
		</Container>
	)
}
