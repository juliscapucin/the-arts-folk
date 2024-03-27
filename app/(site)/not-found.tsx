import Link from "next/link"
import { Container } from "@/components/ui"

export default function NotFound() {
	return (
		<Container classes='flex flex-col justify-center items-center gap-8'>
			<h1 className='text-headlineSmall md:text-headlineMedium lg:text-headlineLarge'>
				Page Not Found
			</h1>
			<span className='font-text text-titleSmall md:text-titleLarge'>
				Could not find the page requested
			</span>
			<Link className='text-titleSmall md:text-titleLarge mt-2' href='/'>
				Return to Home
			</Link>
		</Container>
	)
}
