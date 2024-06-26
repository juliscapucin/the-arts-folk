import { useRef } from "react"

import { Heading } from "@/components/ui"
import { IconEmail } from "@/components/icons"

type ButtonEmailProps = {
	name: string
	email: string
	phone: string
}

export default function ButtonEmail({ name, email, phone }: ButtonEmailProps) {
	const textRef = useRef(null)

	return (
		<div className='flex flex-col justify-center items-center gap-2'>
			<div className='flex gap-2 items-center'>
				<IconEmail />
				<a
					href={`mailto:${email}`}
					className='text-titleLarge'
					rel='noopener noreferrer'
				>
					<Heading tag='h2' variant='body'>
						{name}
					</Heading>
				</a>
			</div>
			<span className='font-text text-bodyMedium font-extralight'>{phone}</span>
		</div>
	)
}
