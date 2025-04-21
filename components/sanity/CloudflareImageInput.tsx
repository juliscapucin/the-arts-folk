import { set, unset } from "sanity"

type Props = {
	value?: { id?: string }
	onChange: (event: ReturnType<typeof set> | ReturnType<typeof unset>) => void
}

const apiBaseURL =
	process.env.NODE_ENV === "development"
		? "http://localhost:3000"
		: "https://theartsfolk.com"

export default function CloudflareImageInput({ value, onChange }: Props) {
	const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]
		if (!file) return

		const formData = new FormData()
		formData.append("file", file)

		try {
			const res = await fetch(`${apiBaseURL}/upload-to-cloudflare`, {
				method: "POST",
				body: formData,
			})

			const data = await res.json()

			if (!res.ok || !data.result?.id) {
				throw new Error(data?.errors?.[0]?.message || "Upload failed")
			}

			// Save the Cloudflare image ID to Sanity
			onChange(
				set({
					_type: "cloudflareImage",
					_key: crypto.randomUUID(),
					id: data.result.id,
				})
			)
		} catch (err) {
			console.error("Upload error:", err)
			alert("Image upload failed. Check the console for details.")
		}
	}

	return (
		<div>
			<input type='file' onChange={handleUpload} />

			{value?.id && (
				<img
					src={`https://imagedelivery.net/${process.env.CF_HASH}/${value.id}/full`}
					alt='Cloudflare Image Preview'
					style={{ maxWidth: "100%", marginTop: "1rem", borderRadius: "8px" }}
				/>
			)}
		</div>
	)
}
