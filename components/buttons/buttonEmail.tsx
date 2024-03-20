import { useRef } from "react"

import { ButtonCopyEmail } from "@/components/buttons"

type ButtonEmailProps = {
	name: string
	email: string
}

export default function ButtonEmail({ name, email }: ButtonEmailProps) {
	const textRef = useRef(null)

	return (
		<div className='flex flex-col justify-center items-center'>
			<a
				href={`mailto:${email}`}
				className='flex flex-col text-displaySmall md:group-hover:-translate-y-1/2 transition-transform duration-200'
			>
				<span className='font-medium'>{name}</span>
			</a>

			<ButtonCopyEmail {...{ email }} />
		</div>
	)
}
