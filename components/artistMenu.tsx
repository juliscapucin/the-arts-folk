"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { Button } from "@/components/ui"

import { Artist } from "@/types"

type ArtistAsideProps = {
	artist: Artist
	sectionSlug: string
	artistSections: string[]
}

export default function ArtistMenu({
	artist,
	sectionSlug,
	artistSections,
}: ArtistAsideProps) {
	const pathname = usePathname()

	console.log(pathname)
	return (
		<nav className='font-text text-labelLarge font-medium flex gap-2 mb-4'>
			{artistSections.map((link, index) => {
				return pathname.includes(link.toLowerCase()) ||
					pathname === `/artists/${artist.name}` ? (
					<>
						<span className='underline' key={link}>
							{link}
						</span>
						{index !== artistSections.length - 1 && <span>/</span>}
					</>
				) : (
					<>
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
						{index !== artistSections.length - 1 && <span>/</span>}
					</>
				)
			})}
		</nav>
	)
}
