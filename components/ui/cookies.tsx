"use client"

import { PortableText } from "@portabletext/react"
import Link from "next/link"

import gsap from "gsap"

import { Container, Heading } from "@/components/ui"
import { Page } from "@/types"

type CookiesProps = {
	cookieData: Page
}

export default function Cookies({ cookieData }: CookiesProps) {
	const transitionOnClick = () => {}
	return (
		<>
			<Container
				classes='absolute top-[--header-height-mobile] lg:top-[--header-height-desktop] left-0 flex items-end justify-center z-100'
				bgColor='transparent'
				isDiv={true}
				hasPadding={false}
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
			</Container>

			{/* Cookie Policy overlay */}
			<Container
				classes='absolute top-[--header-height-mobile] left-0 h-[--container-height-mobile] lg:h-[--container-height-desktop] overflow-y-scroll z-100'
				isDiv={true}
				hasPadding={false}
			>
				<div className='md:w-1/2 xl:w-1/3 mt-16 px-8 lg:mt-32 [&>p]:font-text [&>p]:font-extralight [&>p>a]:font-normal [&>h4, &>h3]:text-titleLarge [&>h2]:text-headlineLarge'>
					<Heading tag='h1' variant='headline' classes='mb-16'>
						{cookieData.title}
					</Heading>
					<PortableText value={cookieData.content} />
				</div>
			</Container>
		</>
	)
}
