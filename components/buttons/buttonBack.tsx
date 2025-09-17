import React from 'react'
import { Button } from '@/components/ui'
import { IconChevron } from '@/components/icons'

type ButtonBackProps = {
	classes?: string
	href: string
	label: string
}

export default function buttonBack({ classes, href, label }: ButtonBackProps) {
	return (
		<Button
			href={href}
			classes={`block uppercase font-text text-label-large font-medium flex gap-4 -ml-2 w-fit ${classes}`}>
			<IconChevron classes={'rotate-90 scale-75'} />
			<span className='underlined-link'>{label}</span>
		</Button>
	)
}
