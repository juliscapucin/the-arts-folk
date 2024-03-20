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
				className={`w-screen min-h-svh p-4 overflow-x-clip bg-primary ${inter.className}`}
			>
				<Header />
				{children}
			</body>
		</html>
	)
}
