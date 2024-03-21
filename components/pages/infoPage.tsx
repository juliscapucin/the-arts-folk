"use client"

import { Container, NavbarSocials } from "@/components/ui"
import { Copyright } from "@/components"
import { ButtonEmail } from "@/components/buttons"

type InfoPageProps = {
	socialLinks: { title: string; url: string }[]
}

export default function InfoPage({ socialLinks }: InfoPageProps) {
	return (
		<Container classes='flex gap-32 pt-32'>
			<div className='font-text tracking-wide'>
				<p>
					The Arts Folk, is an international photographic agency representing a
					diverse network of storytellers.
				</p>
				<p>
					Our Image-makers and directors operate as part of an interconnected
					and progressive cultural community, who seek to spark dialogue amongst
					curious minds.
				</p>
				<p>
					We offer seamless production & casting services at the highest level
					tocreate compelling visual content for Fashion, Beauty and Lifestyle
					brands across Europe.
				</p>
			</div>
			<div>
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
