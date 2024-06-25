"use client"

import { usePathname } from "next/navigation"

import { Button } from "@/components/ui"
import { Artist } from "@/types"

type ArtistAsideProps = {
	artist: Artist
	sectionSlug: string
	artistSections: string[]
}

export default function artistAside({
	artist,
	sectionSlug,
	artistSections,
}: ArtistAsideProps) {
	const pathname = usePathname()

	return (
		<aside className='fixed w-3/12 font-text'>
			{/* Artist Sections */}
			<nav className='text-labelLarge font-medium mt-2'>
				{artistSections.map((link) => {
					const linkLowerCase = link.toLowerCase()
					const isActive =
						pathname.includes(linkLowerCase) ||
						(pathname === `/artists/${artist.slug}` && link === "Featured")

					return isActive ? (
						<span className='active underlined-link block' key={link}>
							{link}
						</span>
					) : (
						<Button
							key={link}
							classes={"underlined-link block"}
							href={`/artists/${artist.slug}/${linkLowerCase}`}
						>
							<span>{link}</span>
						</Button>
					)
				})}
			</nav>

			{/* Artist Info */}
			<p className='mt-16'>{artist.artistInfo}</p>

			{/* Secondary Links */}
			<div className='fixed bottom-[--footer-height-mobile] flex items-end'>
				<div className='mb-32'>
					<Button
						href='/info'
						classes={"block uppercase mt-8 text-labelLarge font-medium"}
					>
						<span>Contact Agent</span>
					</Button>
					<a className='block text-labelLarge font-medium' href='#'>
						Instagram
					</a>
					<Button
						href='/artists'
						classes={"block uppercase mt-8 text-labelLarge font-medium"}
					>
						<span>Back to Artists</span>
					</Button>
				</div>
			</div>
		</aside>
	)
}
