const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' player.vimeo.com f.vimeocdn.com;
  style-src 'self' 'unsafe-inline' use.typekit.net p.typekit.net;
  img-src 'self' data: blob: *.vimeocdn.com *.vimeo.com *.cloudinary.com res.cloudinary.com;
  media-src 'self' *.vimeocdn.com *.vimeo.com *.cloudinary.com res.cloudinary.com;
  frame-src 'self' player.vimeo.com;
  connect-src 'self' vimeo.com *.vimeo.com *.vimeocdn.com *.cloudinary.com res.cloudinary.com;
  font-src 'self' data: use.typekit.net;
  object-src 'none';
`

const securityHeaders = [
	{
		key: "Content-Security-Policy",
		value: ContentSecurityPolicy.replace(/\s{2,}/g, " ").trim(),
	},
]

const nextConfig = {
	reactStrictMode: true,
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
