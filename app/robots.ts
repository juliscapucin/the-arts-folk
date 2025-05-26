import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: [
			{
				userAgent: 'GPTBot',
				disallow: '/',
			},
			{
				userAgent: 'ClaudeBot',
				disallow: '/',
			},
			{
				userAgent: 'AhrefsBot',
				disallow: '/',
			},
			{
				userAgent: 'archive.org_bot',
				disallow: '/',
			},
			{
				userAgent: 'ImagesiftBot',
				disallow: '/',
			},
			{
				userAgent: 'Bytespider',
				disallow: '/',
			},
			{
				userAgent: 'OAI-SearchBot',
				disallow: '/',
			},
			{
				userAgent: 'crawler',
				disallow: '/',
			},
			{
				userAgent: '*',
				allow: '/',
			},
		],
	}
}
