import Link from 'next/link'
import { Container } from '@/components/ui'

export default function NotFound() {
	return (
		<Container classes='flex flex-col justify-center items-center gap-8'>
			<h1 className='text-headline-small md:text-headline-medium lg:text-headline-large'>
				Page Not Found
			</h1>
			<span className='font-text text-title-small md:text-title-large'>
				Could not find the page requested
			</span>
			<Link className='text-title-small md:text-title-large mt-2' href='/'>
				Return to Home
			</Link>
		</Container>
	)
}
