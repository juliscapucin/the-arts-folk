import Link from "next/link"
import { getFooterNavLinks } from "@/sanity/sanity-queries"

export default async function Footer() {
	const navLinks = await getFooterNavLinks()

	return (
		<footer className='w-full px-6 h-[--footer-height-mobile] lg:h-[--footer-height-desktop] flex justify-center lg:justify-start items-center gap-6 lg:gap-8 font-text font-extralight text-bodySmall lg:text-labelLarge tracking-wide'>
			{navLinks &&
				navLinks.map((link) => {
					return link.url ? (
						<a
							key={`${link.title}-footer`}
							href={link.url}
							target='_blank'
							rel='noopener noreferrer'
						>
							{link.title}
						</a>
					) : (
						<Link key={`${link.title}-footer`} href={`/${link.slug}`}>
							{link.title}
						</Link>
					)
				})}
		</footer>
	)
}
