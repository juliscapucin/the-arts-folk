import type { Metadata } from "next"
import localFont from "next/font/local"

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

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`${myFont.className} w-screen max-w-desktop min-h-svh mx-auto overflow-x-clip bg-white uppercase font-text font-thin`}
			>
				<Intro />
				<Header />
				{children}
				<Footer />
				<Cookies />
			</body>
		</html>
	)
}
