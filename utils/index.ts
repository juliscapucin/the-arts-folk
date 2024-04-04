export const GSAPQueries = {
	isMobile: "(max-width: 800px)",
	isDesktop: "(min-width: 801px)",
}

export const metadataFallback = {
	metadataBase: new URL("https://dev.theartsfolk.com"),
	title: "The Arts Folk",
	description:
		"Photographic, Production & Casting Agency. We represent a diverse network of collaborators and storytellers, image-makers & directors.",
	keywords: [
		"Photography",
		"Production",
		"Casting",
		"Agency",
		"Artists",
		"Storytellers",
		"Image-makers",
		"Directors",
		"Photographers",
	],
	icons: {
		icon: "/icon.png",
		shortcut: "/shortcut-icon.png",
		apple: "/apple-icon.png",
		other: {
			rel: "apple-touch-icon-precomposed",
			url: "/apple-touch-icon-precomposed.png",
		},
	},
	openGraph: {
		title: "Next.js",
		description: "The React Framework for the Web",
		url: "https://dev.theartsfolk.com",
		siteName: "Next.js",
		images: [
			{
				url: "https://dev.theartsfolk.com/_next/static/media/opengraph-image.62da8378.png",
				width: 2400,
				height: 1260,
			},
		],
	},
	twitter: {
		images: [
			{
				url: "https://dev.theartsfolk.com/_next/static/media/opengraph-image.62da8378.png",
				width: 2400,
				height: 1260,
			},
		],
	},
}
