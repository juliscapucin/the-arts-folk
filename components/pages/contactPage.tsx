import { NavbarSocials } from "@/components/ui"

type ContactPageProps = {
	socialLinks: { title: string; url: string }[]
}

export default function contactPage({ socialLinks }: ContactPageProps) {
	return (
		<main>
			<NavbarSocials data={socialLinks} />
		</main>
	)
}
