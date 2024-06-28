"use client"

import { usePathname } from "next/navigation"

import { Button } from "@/components/ui"
import { Artist } from "@/types"
import { IconChevron } from "./icons"
import { ButtonBack } from "@/components/buttons"

type ArtistAsideProps = {
	artist: Artist
	sectionSlug: string
	artistSections: string[]
}

export default function artistAside({
	artist,
	artistSections,
}: ArtistAsideProps) {
	const pathname = usePathname()

	return (
		<aside className='fixed top-32 w-1/2 md:w-[25%] max-w-[400px] pr-8 font-text bg-primary z-artistAside'>
			{/* Back Button */}
			<ButtonBack href='/artists' label='Back to Artists' />

			{/* Artist Sections */}
			<nav className='text-labelLarge font-medium mt-16'>
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
							transitionZIndex='z-transitionLow'
						>
							<span>{link}</span>
						</Button>
					)
				})}
			</nav>

			{/* Artist Info */}
			<p className='block my-12 text-bodyMedium'>{artist.artistInfo}</p>

			{/* Secondary Links */}
			<div className='mb-32'>
				<Button
					href='/info'
					classes={
						"underlined-link block uppercase mt-8 text-labelLarge font-medium"
					}
				>
					<span>Contact Agent</span>
				</Button>
				<a
					className='underlined-link block text-labelLarge font-medium'
					href='#'
				>
					Instagram
				</a>
			</div>
		</aside>
	)
}
