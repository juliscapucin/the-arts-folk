'use client'

import { usePathname } from 'next/navigation'

import { Button } from '@/components/ui'
import { Artist, ArtistSection } from '@/types'

type ArtistAsideProps = {
	artist: Artist
	artistSections: ArtistSection[]
}

export default function ArtistAside({
	artist,
	artistSections,
}: ArtistAsideProps) {
	const pathname = usePathname()

	return (
		<aside className={`w-1/3 lg:w-1/4 pr-8 font-text z-artistAside`}>
			{/* Artist Sections */}
			<nav className='text-labelLarge font-medium mt-2 md:mt-16'>
				{artistSections.map((link) => {
					const linkLowerCase = link.title.toLowerCase()
					const isActive =
						pathname.includes(linkLowerCase) ||
						(pathname === `/artists/${artist.slug}` &&
							link.title === 'Featured')

					return isActive ? (
						<span className='active underlined-link block' key={link.title}>
							{link.title}
						</span>
					) : (
						<Button
							key={link.title}
							classes={'underlined-link block'}
							href={`/artists/${artist.slug}/${linkLowerCase}`}
							transitionZIndex='z-transition-low'>
							<span>{link.title}</span>
						</Button>
					)
				})}
			</nav>

			{/* Artist Info */}
			<p className='hidden sm:block my-12 lg:pr-8 text-body-medium'>
				{artist.artistInfo}
			</p>

			{/* Secondary Links */}
			<div className='mb-32'>
				{artist.agentEmail && (
					<a
						href={`mailto:${artist.agentEmail}`}
						className='underlined-link block uppercase mt-8 text-labelLarge font-medium'
						rel='noopener noreferrer'>
						<span>Contact Agent</span>
					</a>
				)}
				{artist.artistInstagram && (
					<a
						className='underlined-link block text-labelLarge font-medium'
						href={artist.artistInstagram}>
						Instagram
					</a>
				)}
			</div>
		</aside>
	)
}
