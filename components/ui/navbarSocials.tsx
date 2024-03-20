"use client"

import Link from "next/link"

type SocialLink = { title: string; url?: string }

type NavbarSocialsProps = {
	data: SocialLink[] | undefined
}

export default function SocialLinks({ data }: NavbarSocialsProps) {
	return (
		<>
			{data && (
				<div className='overflow-hidden'>
					{data.map((link) => {
						if (!link.url) return
						const url = link.url

						return (
							<Link href={url!} key={link.title} target='_blank'>
								{link.title}
							</Link>
						)
					})}
				</div>
			)}
		</>
	)
}
