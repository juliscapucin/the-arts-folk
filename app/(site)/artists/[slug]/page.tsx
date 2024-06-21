import { notFound } from "next/navigation"

type Params = {
	params: {
		slug: string
	}
}

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = params

	return notFound()

	console.log("hello")
}
