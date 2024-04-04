import type { Metadata } from "next"
import localFont from "next/font/local"

import { getHeaderNavLinks } from "@/sanity/sanity-queries"
export const revalidate = 300

import "../globals.css"
import { Header, Footer } from "@/components/ui"
import { CookiesServer } from "@/components/server"
import { Intro } from "@/components"

import { getPage } from "@/sanity/sanity-queries"

const fallbackNavLinks = [
	{ title: "Artists", slug: "artists", order: 1 },
	{ title: "Info", slug: "info", order: 2 },
]

export async function generateMetadata() {
	const pageData = getPage("home")
	const page = await pageData

	if (!page) {
		return {
			title: "The Arts Folk",
			description:
				"Photographic, Production & Casting Agency. We represent a diverse network of collaborators and storytellers, image-makers & directors.",
		}
	}

	return {
		title: page.title,
		description: `${page.metadataDescription}`,
	}
}

// Load custom font //
const myFont = localFont({
	variable: "--font-primary",
	src: [
		{
			path: "../../public/fonts/geometos-neue-extrabold.otf",
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

	return (
		<html lang='en' className='overflow-clip'>
			<body
				className={`${myFont.className} relative w-screen max-w-desktop min-h-svh mx-auto overflow-x-clip bg-white uppercase font-text font-thin`}
			>
				<Intro />
				<Header navLinks={navLinks} />
				{children}
				<Footer />
				<CookiesServer />
			</body>
		</html>
	)
}
