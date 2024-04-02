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
	return (
		<>
			{isActive ? (
				<span className='uppercase font-text font-extralight text-bodyLarge tracking-wider text-faded-50 select-none'>
					{link.title}
				</span>
			) : (
				<Link key={link.slug} href={`/${link.slug}`} passHref legacyBehavior>
					<button
						onClick={(e) => {
							e.preventDefault()
							transitionOnClick(link)
						}}
						className='uppercase font-text font-extralight text-bodyLarge tracking-wider select-none'
					>
						{link.title}
					</button>
				</Link>
			)}
		</>
	)
}
