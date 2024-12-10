import localFont from "next/font/local"

import { getHeaderNavLinks } from "@/sanity/sanity-queries"

// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic"

// export const revalidate = 300

import "../globals.css"
import { PageContextProvider } from "@/context"

import { Header, Footer } from "@/components/ui"
import { CookiesServer } from "@/components/server"
import { Intro, PageTransition } from "@/components"

import { getPage } from "@/sanity/sanity-queries"
import { metadataFallback } from "@/utils"

const fallbackNavLinks = [
	{ title: "Artists", slug: "artists", order: 1 },
	{ title: "Info", slug: "info", order: 2 },
]

export async function generateMetadata() {
	const pageData = getPage("home")
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
	variable: "--font-primary",
	src: [
		{
			path: "../../public/fonts/geometos-neue-extrabold.otf",
		},
	],
	display: "swap",
})

const scriptFont = localFont({
	variable: "--font-script",
	src: [
		{
			path: "../../public/fonts/hammock.woff",
		},
	],
	display: "swap",
})

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	let navLinks = await getHeaderNavLinks()

	if (!navLinks || navLinks.length === 0) navLinks = fallbackNavLinks

	// TODO: Remove this when the production page is ready
	navLinks.push({
		title: "Production",
		slug: "production",
		order: 3,
	})
	navLinks.sort((a, b) => a.order - b.order)

	return (
		<html lang='en' className='gutter-stable relative overflow-x-clip'>
			<PageContextProvider>
				<body
					className={`${displayFont.className} ${scriptFont.variable} gutter-stable w-screen overflow-x-clip bg-primary uppercase font-text font-thin`}
				>
					<Intro />
					<PageTransition />
					<Header navLinks={navLinks} />
					{children}
					<Footer />
					{/* TODO: Fix this */}
					<CookiesServer />
				</body>
			</PageContextProvider>
		</html>
	)
}
