import { useMemo, useRef } from "react"

import { ButtonCopyEmail } from "@/components/buttons"

type Props = {
	availability?: string
	variant?: string
	modalOpen?: boolean
}

export default function ButtonEmail({
	variant,
	modalOpen,
	availability,
}: Props) {
	const textRef = useRef(null)
	const email = "hello@theartsfolk.com"

	return (
		<div className='flex flex-col justify-center items-center'>
			<a
				href={`mailto:${email}`}
				className='flex flex-col text-displaySmall md:group-hover:-translate-y-1/2 transition-transform duration-200'
			>
				<span ref={textRef} className='font-medium'>
					Say Hi :)
				</span>
				<span className='font-medium'>Say Hi :)</span>
			</a>

			<ButtonCopyEmail {...{ email }} />
		</div>
	)
}
