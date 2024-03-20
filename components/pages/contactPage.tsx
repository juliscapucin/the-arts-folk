"use client"

import { NavbarSocials } from "@/components/ui"
import { Copyright } from "@/components"
import { ButtonEmail } from "@/components/buttons"

type ContactPageProps = {
	socialLinks: { title: string; url: string }[]
}

export default function contactPage({ socialLinks }: ContactPageProps) {
	return (
		<main>
			<ButtonEmail />
			<NavbarSocials data={socialLinks} />
			<Copyright />
		</main>
	)
}
