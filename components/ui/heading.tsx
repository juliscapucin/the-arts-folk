type HeadingProps = {
	tag: string
	classes?: string
	children: string
	variant?: "display" | "headline" | "title" | "body"
}

export default function Heading({
	tag,
	classes,
	children,
	variant,
}: HeadingProps) {
	const Tag = tag as keyof JSX.IntrinsicElements
	let headingStyles = ""

	switch (variant) {
		case "display":
			headingStyles =
				"text-displaySmall text-balance md:text-displayMedium lg:text-displayLarge font-normal"
			break
		case "headline":
			headingStyles =
				"text-headlineSmall text-balance md:text-headlineMedium lg:text-headlineLarge"
			break
		case "title":
			headingStyles =
				"text-titleSmall text-balance md:text-titleMedium lg:text-titleLarge"
			break
		case "body":
			headingStyles =
				"text-bodySmall text-balance md:text-bodyMedium lg:text-bodyLarge"
			break
		default:
			headingStyles =
				"text-displaySmall text-balance md:text-displayMedium lg:text-displayLarge"
			break
	}

	return (
		<Tag
			className={`font-heading leading-none ${
				classes && classes
			} ${headingStyles}`}
		>
			{children}
		</Tag>
	)
}
