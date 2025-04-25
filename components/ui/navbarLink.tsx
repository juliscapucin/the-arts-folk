import Link from "next/link"

import type { NavLink } from "@/types"

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
	const classes =
		"underlined-link uppercase font-text font-extralight text-bodyLarge tracking-wide select-none"
	return (
		<>
			{isActive ? (
				<span className={`active ${classes}`}>{link.title}</span>
			) : (
				<Link key={link.slug} href={`/${link.slug}`} passHref legacyBehavior>
					<button
						onClick={(e) => {
							e.preventDefault()
							transitionOnClick(link)
						}}
						className={classes}
					>
						{link.title}
					</button>
				</Link>
			)}
		</>
	)
}
