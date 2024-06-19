import { notFound } from "next/navigation"

type Params = {
	params: {
		slug: string
	}
}

export default async function Page({ params }: { params: { slug: string } }) {
	const { slug } = params

	return (
		<main className='min-h-[--container-height-desktop] pt-[--header-height-desktop] color-primary'>
			<h1>News</h1>
			<p>{slug}</p>
		</main>
	)
}
