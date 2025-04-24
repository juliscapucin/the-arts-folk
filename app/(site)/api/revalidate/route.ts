import { NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(req: NextRequest) {
	const secret = req.nextUrl.searchParams.get("secret")

	// SECURITY CHECK
	if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
		return NextResponse.json({ message: "Invalid token" }, { status: 401 })
	}

	try {
		const body = await req.json()

		await Promise.all([revalidatePath("/"), revalidatePath("/info")])

		return NextResponse.json({ revalidated: true })
	} catch (err) {
		console.error("Error revalidating:", err)
		return NextResponse.json({ message: "Error revalidating" }, { status: 500 })
	}
}
