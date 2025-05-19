import { MetadataRoute } from "next"

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: "GPTBot",
				disallow: "/",
			},
			{
				userAgent: "ClaudeBot",
				disallow: "/",
			},
			{
				userAgent: "AhrefsBot",
				disallow: "/",
			},
			{
				userAgent: "archive.org_bot",
				disallow: "/",
			},
			{
				userAgent: "*",
				allow: "/",
			},
		],
		// Optional: include your sitemap if you have one
		//  sitemap: 'https://yourdomain.com/sitemap.xml',
	}
}
