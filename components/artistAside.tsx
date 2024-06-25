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

	return (
		<aside className='w-3/12 font-text'>
			<nav className='text-labelLarge font-medium'>
				{artistSections.map((link) => {
					return pathname.includes(link.toLowerCase()) ||
						pathname === `/artists/${artist.name}` ? (
						<span className='underline' key={link}>
							{link}
						</span>
					) : (
						<Link
							key={link}
							href={`/artists/${artist.slug}/${link.toLowerCase()}`}
							passHref
							legacyBehavior
						>
							<Button classes={"block uppercase"}>
								<span>{link}</span>
							</Button>
						</Link>
					)
				})}
			</nav>
			<p className='mt-8'>{artist.artistInfo}</p>
			<Link href='/info' passHref legacyBehavior>
				<Button classes={"block uppercase mt-8 text-labelLarge font-medium"}>
					<span>Contact Agent</span>
				</Button>
			</Link>
			<a className='block text-labelLarge font-medium' href='#'>
				Instagram
			</a>
			<Link href='/artists' passHref legacyBehavior>
				<Button classes={"block uppercase mt-8 text-labelLarge font-medium"}>
					<span>Back to Artists</span>
				</Button>
			</Link>
		</aside>
	)
}
