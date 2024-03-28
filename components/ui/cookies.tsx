"use client"

import Link from "next/link"

import gsap from "gsap"

import { Container } from "@/components/ui"
import { Page } from "@/types"

type CookiesProps = {
	cookieData: Page
}

export default function Cookies({ cookieData }: CookiesProps) {
	const transitionOnClick = () => {}
	return (
		<Container
			classes='absolute top-[--header-height-mobile] lg:top-[--header-height-desktop] left-0 flex items-end justify-center z-100'
			bgColor='transparent'
		>
			<div className='space-x-4 bg-secondary text-primary p-8'>
				<Link href='/' passHref legacyBehavior>
					<button
						onClick={(e) => {
							e.preventDefault()
							transitionOnClick()
						}}
						className='underlined-link uppercase font-text font-extralight text-bodyMedium tracking-wider text-primary select-none'
					>
						This site uses cookies
					</button>
				</Link>
				<button>OK</button>
			</div>
			<div className='absolute w-full h-full bg-secondary text-primary z-100'>
				{cookieData.title}
			</div>
		</Container>
	)
}
