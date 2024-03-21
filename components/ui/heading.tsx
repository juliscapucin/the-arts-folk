type HeadingProps = {
	tag: string
	classes?: string
	children: string
	variant: "display" | "headline" | "title"
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
				"text-displaySmall md:text-displayMedium lg:text-displayLarge font-normal"
			break
		case "headline":
			headingStyles =
				"text-headlineSmall md:text-headlineMedium lg:text-headlineLarge"
			break
		case "title":
			headingStyles = "text-titleSmall md:text-titleMedium lg:text-titleLarge"
			break
		default:
			headingStyles =
				"text-displaySmall md:text-displayMedium lg:text-displayLarge"
			break
	}

	return (
		<Tag
			className={`font-heading ${
				classes ? classes : ""
			} ${headingStyles} leading-none`}
		>
			{children}
		</Tag>
	)
}
