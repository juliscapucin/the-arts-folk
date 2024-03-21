import { NavLink } from "@/types"
import Link from "next/link"

type NavbarLinkProps = {
	link: NavLink
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
				className={`uppercase font-text text-bodyLarge tracking-wider ${
					isActive ? "text-faded-30" : ""
				}`}
			>
				{link.label}
			</button>
		</Link>
	)
}
