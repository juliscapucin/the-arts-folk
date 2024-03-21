import type { Metadata } from "next"
import localFont from "next/font/local"

import "./globals.css"
import { Footer, Header, Layout } from "@/components/ui"

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
			path: "../public/fonts/geometos-neue-extrabold.otf",
		},
	],
})

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return <Layout customFont={myFont.className}>{children}</Layout>
}
