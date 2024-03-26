// pages/api/upload.ts

import type { NextApiRequest, NextApiResponse } from "next"
import cloudinary from "cloudinary"

cloudinary.v2.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
	api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
})

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	if (req.method !== "POST") {
		return res.status(405).json({ message: "Method not allowed" })
	}

	try {
		const fileStr = req.body.data
		const uploadResponse = await cloudinary.v2.uploader.upload(fileStr, {
			upload_preset: "YOUR_UPLOAD_PRESET",
		})
		res.status(200).json({ url: uploadResponse.secure_url })
	} catch (err) {
		console.error(err)
		res.status(500).json({ error: "Something went wrong" })
	}
}
