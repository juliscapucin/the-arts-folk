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
				'text-displaySmall text-balance md:text-displayMedium lg:text-displayLarge font-normal'
			break
		case 'headline':
			headingStyles =
				'text-headlineSmall text-balance md:text-headlineMedium lg:text-headlineLarge'
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
				'text-displaySmall text-balance md:text-displayMedium lg:text-displayLarge'
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
