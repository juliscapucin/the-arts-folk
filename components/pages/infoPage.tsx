"use client"

import { Container, NavbarSocials } from "@/components/ui"
import { Copyright } from "@/components"
import { ButtonEmail } from "@/components/buttons"

type InfoPageProps = {
	socialLinks: { title: string; url: string }[]
}

export default function InfoPage({ socialLinks }: InfoPageProps) {
	return (
		<Container>
			<ButtonEmail name={"Ruby Khatun"} email={"ruby@theartsfolk.com"} />
			<ButtonEmail
				name={"Florian Pessenteiner"}
				email={"florian@theartsfolk.com"}
			/>
			<NavbarSocials data={socialLinks} />
			<Copyright />
		</Container>
	)
}
