import { getFooterNavLinks } from "@/sanity/sanity-queries"
import { Button } from "@/components/ui"

export default async function Footer() {
	const navLinks = await getFooterNavLinks()

	return (
		<footer className='max-w-screen h-[--footer-height-mobile] lg:h-[--footer-height-desktop] flex justify-center lg:justify-start items-center gap-6 lg:gap-8 font-text font-extralight text-bodySmall lg:text-labelLarge tracking-wide bg-primary z-100'>
			{navLinks &&
				navLinks.map((link) => {
					return link.url ? (
						<a
							className='underlined-link'
							key={`${link.title}-footer`}
							href={link.url}
							target='_blank'
							rel='noopener noreferrer'
						>
							{link.title}
						</a>
					) : (
						<Button
							classes='underlined-link'
							key={`${link.title}-footer`}
							href={`/${link.slug}`}
						>
							{link.title}
						</Button>
					)
				})}
		</footer>
	)
}
