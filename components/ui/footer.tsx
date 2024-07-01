import { getFooterNavLinks } from "@/sanity/sanity-queries"
import { Button } from "@/components/ui"

export default async function Footer() {
	const navLinks = await getFooterNavLinks()

	return (
		<footer className='absolute left-0 right-0 bottom-0 bg-primary w-full h-[--footer-height-mobile] lg:h-[--footer-height-desktop] z-100'>
			<div className='w-full max-w-desktop mx-auto px-[--margin-mobile] lg:px-[margin-desktop] flex justify-center lg:justify-start items-center gap-6 lg:gap-8 font-text font-extralight text-bodySmall lg:text-labelLarge tracking-wide'>
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
			</div>
		</footer>
	)
}
