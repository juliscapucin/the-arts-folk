import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Header } from "@/components/ui"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
	title: "The Arts Folk",
	description:
		"we represent a diverse network of collaborators and storytellers, image-makers & directors.",
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body
				className={`w-screen max-w-desktop min-h-svh mx-auto overflow-x-clip bg-white ${inter.className}`}
			>
				<Header />
				{children}
			</body>
		</html>
	)
}
