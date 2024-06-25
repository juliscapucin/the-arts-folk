import Link from "next/link"

import { Button } from "@/components/ui"

export default function artistAside() {
	return (
		<aside className='w-3/12 font-text'>
			<ul className='text-labelLarge font-medium'>
				<li className='underline'>Featured</li>
				<li>Portfolio</li>
				<li>Motion</li>
				<li>Personal</li>
			</ul>
			<p className='mt-8'>
				Isaac Marley Morgan is a London based photographer & art director
			</p>
			<Link href='/info' passHref legacyBehavior>
				<Button classes={"block uppercase mt-8"}>
					<span>Contact Agent</span>
				</Button>
			</Link>
			<a className='block' href='#'>
				Instagram
			</a>
		</aside>
	)
}
