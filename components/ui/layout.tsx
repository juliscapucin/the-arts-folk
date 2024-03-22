"use client"

import { Footer, Header } from "@/components/ui"
import { usePathname } from "next/navigation"

type LayoutProps = {
	children: React.ReactNode
	customFont: string
}

export default function Layout({ children, customFont }: LayoutProps) {
	const pathname = usePathname()

	return (
		<html lang='en'>
			<body
				className={`${customFont} w-screen max-w-desktop min-h-svh mx-auto overflow-x-clip bg-white uppercase font-text font-thin`}
			>
				<Header />
				{children}
				<Footer />
			</body>
		</html>
	)
}
