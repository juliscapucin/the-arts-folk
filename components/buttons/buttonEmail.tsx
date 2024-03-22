import { useRef } from "react"

import { ButtonCopyEmail } from "@/components/buttons"
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
			<a
				href={`mailto:${email}`}
				className='group flex justify-center items-center gap-2 text-titleLarge hover:opacity-50 transition-opacity duration-300'
				rel='noopener noreferrer'
			>
				<IconEmail />
				<Heading tag='h4' variant='title' classes='leading-3'>
					{name}
				</Heading>
			</a>
			<span className='font-text text-bodyLarge'>{phone}</span>

			{/* <ButtonCopyEmail {...{ email }} /> */}
		</div>
	)
}
