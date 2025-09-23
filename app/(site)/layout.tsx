import localFont from 'next/font/local'

import { getHeaderNavLinks } from '@/sanity/sanity-queries'

import { PageContextProvider } from '@/context'
import '../globals.css'

import { Intro, PageTransition } from '@/components'
import { CookiesServer } from '@/components/server'
import { Footer, Header } from '@/components/ui'

import { getPage } from '@/sanity/sanity-queries'
import { metadataFallback } from '@/utils'

const fallbackNavLinks = [
	{ title: 'Artists', slug: 'artists', order: 1 },
	{ title: 'Info', slug: 'info', order: 2 },
]

export async function generateMetadata() {
	const pageData = getPage('home')
	const page = await pageData

	if (!page) {
		return metadataFallback
	}

	return {
		metadataBase: metadataFallback.metadataBase,
		title: page.metadataTitle || metadataFallback.title,
		description: page.metadataDescription || metadataFallback.description,
		keywords: page.metadataKeywords || metadataFallback.keywords,
	}
}

// Load custom fonts //
const displayFont = localFont({
	variable: '--font-primary',
	src: [
		{
			path: '../../lib/fonts/geometos-neue-extrabold.otf',
		},
	],
	display: 'swap',
})

const scriptFont = localFont({
	variable: '--font-script',
	src: [
		{
			path: '../../lib/fonts/hammock.woff',
		},
	],
	display: 'swap',
})

let navLinks = await getHeaderNavLinks()
if (!navLinks || navLinks.length === 0) navLinks = fallbackNavLinks
navLinks.sort((a, b) => a.order - b.order)

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className='gutter-stable relative overflow-x-clip'>
			<body
				className={`${displayFont.variable} ${scriptFont.variable} gutter-stable w-screen overflow-x-clip bg-primary uppercase font-text font-thin`}>
				<PageContextProvider>
					<Intro />
					<PageTransition />
					<Header navLinks={navLinks} />
					{children}
					<Footer />
				</PageContextProvider>
				<CookiesServer />
			</body>
		</html>
	)
}
