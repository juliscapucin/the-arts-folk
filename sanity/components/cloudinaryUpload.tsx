// src/components/CloudinaryUpload.tsx

import React, { useState } from "react"
import { Button } from "@sanity/ui"

type Props = {
	// Add necessary props here, e.g., for handling the value change
	onChange: (url: string) => void
}

const CloudinaryUpload: React.FC<Props> = ({ onChange }) => {
	const [uploading, setUploading] = useState(false)

	const handleFileChange = async (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const files = event.target.files
		if (!files || files.length === 0) {
			return
		}

		setUploading(true)

		// Call your serverless function to upload the file
		const formData = new FormData()
		formData.append("file", files[0])
		// Replace YOUR_SERVERLESS_ENDPOINT with the actual endpoint
		const response = await fetch("YOUR_SERVERLESS_ENDPOINT", {
			method: "POST",
			body: formData,
		})
		const data = await response.json()

		onChange(data.url)
		setUploading(false)
	}

	return (
		<div>
			<input type='file' onChange={handleFileChange} disabled={uploading} />
			{uploading && <p>Uploading...</p>}
		</div>
	)
}

export default CloudinaryUpload
