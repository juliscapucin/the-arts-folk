// const ContentSecurityPolicy = `
//   script-src 'self' 'unsafe-inline' 'unsafe-eval' *;
// `
const ContentSecurityPolicy = `
	  default-src 'self';
	  script-src 'self' 'unsafe-inline' 'unsafe-eval' player.vimeo.com f.vimeocdn.com i.vimeocdn.com https://media-library.cloudinary.com;
	  style-src 'self' 'unsafe-inline' use.typekit.net p.typekit.net;
	  img-src 'self' data: blob: *.vimeocdn.com *.vimeo.com *.cloudinary.com res.cloudinary.com;
	  media-src 'self' blob: *.vimeocdn.com *.vimeo.com *.cloudinary.com res.cloudinary.com;
	  frame-src 'self' player.vimeo.com *.vimeo.com https://console.cloudinary.com;
	  connect-src 'self' vimeo.com *.vimeo.com *.vimeocdn.com *.cloudinary.com res.cloudinary.com fqgs6dmb.api.sanity.io wss://fqgs6dmb.api.sanity.io;
	  font-src 'self' data: use.typekit.net;
	  object-src 'none';
	`
	.replace(/\s{2,}/g, " ")
	.trim()

const securityHeaders = [
	{
		key: "Content-Security-Policy",
		value: ContentSecurityPolicy,
	},
]

const nextConfig = {
	reactStrictMode: false,
	swcMinify: true,
	async headers() {
		return [
			{
				source: "/(.*)",
				headers: securityHeaders,
			},
		]
	},
}

export default nextConfig
