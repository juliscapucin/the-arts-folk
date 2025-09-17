import { getFooterNavLinks } from '@/sanity/sanity-queries'
import { Button } from '@/components/ui'

export default async function Footer() {
	const navLinks = await getFooterNavLinks()

	return (
		<footer className='block bg-primary w-full h-[var(--footer-height-mobile)] lg:h-[var(--footer-height-desktop)] z-100'>
			<div className='w-full max-w-desktop mx-auto px-[var(--margin-mobile)] lg:px-[var(--margin-desktop)] flex justify-center lg:justify-start items-center gap-6 lg:gap-8 font-text font-extralight text-body-small lg:text-labelLarge tracking-wide'>
				{navLinks &&
					navLinks.map((link) => {
						return link.url ? (
							<a
								className='underlined-link'
								key={`${link.title}-footer`}
								href={link.url}
								target='_blank'
								rel='noopener noreferrer'>
								{link.title}
							</a>
						) : (
							<Button
								classes='underlined-link'
								key={`${link.title}-footer`}
								href={`/${link.slug}`}
								prefetch={false}>
								{link.title}
							</Button>
						)
					})}
			</div>
		</footer>
	)
}
