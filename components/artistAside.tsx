"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui"
import { Artist, Category } from "@/types"

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

	console.log(pathname)

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
						<Link
							key={link}
							href={`/artists/${artist.slug}/${linkLowerCase}`}
							passHref
							legacyBehavior
						>
							<Button classes={"underlined-link block"}>
								<span>{link}</span>
							</Button>
						</Link>
					)
				})}
			</nav>

			{/* Artist Info */}
			<p className='mt-16'>{artist.artistInfo}</p>

			{/* Secondary Links */}
			<div className='fixed bottom-[--footer-height-mobile] flex items-end'>
				<div className='mb-32'>
					<Link href='/info' passHref legacyBehavior>
						<Button
							classes={"block uppercase mt-8 text-labelLarge font-medium"}
						>
							<span>Contact Agent</span>
						</Button>
					</Link>
					<a className='block text-labelLarge font-medium' href='#'>
						Instagram
					</a>
					<Link href='/artists' passHref legacyBehavior>
						<Button
							classes={"block uppercase mt-8 text-labelLarge font-medium"}
						>
							<span>Back to Artists</span>
						</Button>
					</Link>
				</div>
			</div>
		</aside>
	)
}
