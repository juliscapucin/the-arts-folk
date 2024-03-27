import { getFooterNavLinks } from "@/sanity/sanity-queries"

export default async function Footer() {
	const navLinks = await getFooterNavLinks()

	return (
		<footer className='w-full pt-2 px-5 lg:px-6 h-[--footer-height-mobile] lg:h-[--footer-height-desktop] flex justify-start items-center gap-8 font-text font-extralight text-labelLarge tracking-wide'>
			{navLinks &&
				navLinks.map((link) => {
					return (
						link.url && (
							<a
								key={`${link.title}-footer`}
								href={link.url}
								target='_blank'
								rel='noopener noreferrer'
							>
								{link.title}
							</a>
						)
					)
				})}
		</footer>
	)
}
