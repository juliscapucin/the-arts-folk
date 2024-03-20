import Link from "next/link"

type NavbarLinkProps = {
	link: {
		label: string
		slug: string
	}
	transitionOnClick: (link: any) => void
	isActive: boolean
}

export default function navbarLink({
	link,
	transitionOnClick,
	isActive,
}: NavbarLinkProps) {
	return (
		<Link key={link.slug} href={`/${link.slug}`} passHref legacyBehavior>
			<button
				onClick={(e) => {
					e.preventDefault()
					transitionOnClick(link)
				}}
				className={isActive ? "text-faded-30" : ""}
			>
				{link.label}
			</button>
		</Link>
	)
}
