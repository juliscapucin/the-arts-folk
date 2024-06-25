import Link from "next/link"

import { Button } from "@/components/ui"
import { Artist } from "@/types"

type ArtistAsideProps = {
	artist: Artist
	sectionSlug: string
}

const links = [
	{
		title: "Featured",
	},
	{
		title: "Portfolio",
	},
	{
		title: "Motion",
	},
	{
		title: "Personal",
	},
]

export default function artistAside({ artist, sectionSlug }: ArtistAsideProps) {
	return (
		<aside className='w-3/12 font-text'>
			<nav className='text-labelLarge font-medium'>
				{links.map((link) => {
					return link.title === sectionSlug ? (
						<span className='underline' key={link.title}>
							{link.title}
						</span>
					) : (
						<Link
							key={link.title}
							href={`/artists/${artist.slug}/${link.title.toLowerCase()}`}
							passHref
							legacyBehavior
						>
							<Button classes={"block uppercase"}>
								<span>{link.title}</span>
							</Button>
						</Link>
					)
				})}
			</nav>
			<p className='mt-8'>{artist.artistInfo}</p>
			<Link href='/info' passHref legacyBehavior>
				<Button classes={"block uppercase mt-8"}>
					<span>Contact Agent</span>
				</Button>
			</Link>
			<a className='block' href='#'>
				Instagram
			</a>
		</aside>
	)
}
