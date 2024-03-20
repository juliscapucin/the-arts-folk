"use client"

import { NavbarSocials } from "@/components/ui"
import { Copyright } from "@/components"
import { ButtonEmail } from "@/components/buttons"

type InfoPageProps = {
	socialLinks: { title: string; url: string }[]
}

export default function InfoPage({ socialLinks }: InfoPageProps) {
	return (
		<main>
			<ButtonEmail name={"Ruby Khatun"} email={"ruby@theartsfolk.com"} />
			<ButtonEmail
				name={"Florian Pessenteiner"}
				email={"florian@theartsfolk.com"}
			/>
			<NavbarSocials data={socialLinks} />
			<Copyright />
		</main>
	)
}
