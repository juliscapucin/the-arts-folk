import { NextRequest, NextResponse } from "next/server"
import { Readable } from "stream"

export const config = {
	api: {
		bodyParser: false,
	},
}

async function buffer(readable: Readable): Promise<Buffer> {
	const chunks: any[] = []
	for await (const chunk of readable) {
		chunks.push(chunk)
	}
	return Buffer.concat(chunks)
}

export async function POST(req: NextRequest) {
	try {
		const contentType = req.headers.get("content-type")
		const boundary = contentType?.split("boundary=")[1]
		if (!boundary) {
			return NextResponse.json({ error: "No boundary found" }, { status: 400 })
		}

		const rawBody = await buffer(req.body as any)

		const res = await fetch(
			`https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/images/v1`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
					"Content-Type": `multipart/form-data; boundary=${boundary}`,
				},
				body: rawBody,
			}
		)

		const data = await res.json()
		return NextResponse.json(data, { status: res.status })
	} catch (err) {
		return NextResponse.json(
			{ message: "Upload failed", error: (err as Error).message },
			{ status: 500 }
		)
	}
}
