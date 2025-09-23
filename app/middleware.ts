import { NextRequest, NextResponse } from 'next/server'

const BLOCKED_BOTS = [
	'ImagesiftBot',
	'Bytespider',
	'crawler',
	'OAI-SearchBot',
	'AhrefsBot',
	'ClaudeBot',
	'GPTBot',
	'archive.org_bot',
]

export function middleware(request: NextRequest) {
	const userAgent = request.headers.get('user-agent') || ''

	const isBlocked = BLOCKED_BOTS.some((bot) =>
		userAgent.toLowerCase().includes(bot.toLowerCase())
	)

	if (isBlocked) {
		return new NextResponse('Blocked by middleware', { status: 403 })
	}

	return NextResponse.next()
}
