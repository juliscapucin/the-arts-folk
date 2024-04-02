import type { Metadata } from "next"
import localFont from "next/font/local"

import { getPage, getHeaderNavLinks } from "@/sanity/sanity-queries"

import "../globals.css"
import { Cookies, Header, Footer } from "@/components/ui"
import { Intro } from "@/components"

const fallbackNavLinks = [
	{ title: "Artists", slug: "artists", order: 1 },
	{ title: "Info", slug: "info", order: 2 },
]

export const metadata: Metadata = {
	title: "The Arts Folk",
	description:
		"we represent a diverse network of collaborators and storytellers, image-makers & directors.",
}

// Load custom font //
const myFont = localFont({
	variable: "--font-primary",
	src: [
		{
			path: "../../public/fonts/geometos-neue-extrabold.otf",
		},
	],
})

export default async function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	const cookieData = await getPage("terms-and-privacy")
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
				<Cookies cookieData={cookieData} />
			</body>
		</html>
	)
}
