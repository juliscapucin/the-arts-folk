import type { JSX } from 'react'
type HeadingProps = {
	tag: string
	classes?: string
	children: string
	variant?: 'display' | 'headline' | 'title' | 'body'
}

export default function Heading({
	tag,
	classes,
	children,
	variant,
}: HeadingProps) {
	const Tag = tag as keyof JSX.IntrinsicElements
	let headingStyles = ''

	switch (variant) {
		case 'display':
			headingStyles =
				'text-display-small text-balance md:text-display-medium lg:text-display-large font-normal'
			break
		case 'headline':
			headingStyles =
				'text-headline-small text-balance md:text-headline-medium lg:text-headline-large'
			break
		case 'title':
			headingStyles =
				'text-title-small text-balance md:text-title-medium lg:text-title-large'
			break
		case 'body':
			headingStyles =
				'text-body-small text-balance md:text-body-medium lg:text-body-large'
			break
		default:
			headingStyles =
				'text-display-small text-balance md:text-display-medium lg:text-display-large'
			break
	}

	return (
		<Tag
			className={`font-heading leading-none ${
				classes && classes
			} ${headingStyles}`}>
			{children}
		</Tag>
	)
}
