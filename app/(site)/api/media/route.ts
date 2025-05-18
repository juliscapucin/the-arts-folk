import { NextRequest, NextResponse } from "next/server"

const BLOCKED_BOTS = ["AhrefsBot", "GPTBot", "ClaudeBot", "archive.org_bot"]

export async function GET(req: NextRequest) {
	const userAgent = req.headers.get("user-agent") || ""

	if (BLOCKED_BOTS.some((bot) => userAgent.includes(bot))) {
		return new NextResponse("Blocked bot", { status: 403 })
	}

	const url = new URL(req.url)
	const publicId = url.searchParams.get("id")

	if (!publicId) {
		return new NextResponse("Missing image ID", { status: 400 })
	}

	// Build your Cloudinary URL (could be signed)
	const cloudinaryUrl = `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${publicId}.jpg`

	// Redirect to Cloudinary
	return NextResponse.redirect(cloudinaryUrl)
}
