import type { Metadata } from "next"
import localFont from "next/font/local"

import { getPage } from "@/sanity/sanity-queries"

import "../globals.css"
import { Cookies, Header, Footer } from "@/components/ui"
import { Intro } from "@/components"

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

	return (
		<html lang='en'>
			<body
				className={`${myFont.className} relative w-screen max-w-desktop min-h-svh mx-auto overflow-x-clip bg-white uppercase font-text font-thin`}
			>
				<Intro />
				<Header />
				{children}
				<Footer />
				<Cookies cookieData={cookieData} />
			</body>
		</html>
	)
}
