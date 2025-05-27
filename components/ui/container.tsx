type ContainerProps = {
	ref?: React.Ref<HTMLDivElement> | undefined
	children: React.ReactNode
	classes?: string
	bgColor?: string
	isDiv?: boolean
	isSection?: boolean
}

export default function Container({
	ref,
	children,
	classes,
	bgColor,
	isDiv,
	isSection,
}: ContainerProps) {
	const HtmlTag = isDiv ? 'div' : isSection ? 'section' : 'main'

	return (
		<HtmlTag
			ref={ref}
			className={`gutter-stable min-h-[--container-height-mobile] lg:min-h-[--container-height-desktop] w-full max-w-desktop mx-auto px-[--margin-mobile] lg:px-[--margin-desktop] ${classes} ${
				bgColor ? bgColor : 'bg-primary'
			}`}>
			{children}
		</HtmlTag>
	)
}
