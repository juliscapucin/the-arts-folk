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

	console.log(variant)

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
		case "body":
			headingStyles = "text-bodySmall md:text-bodyMedium lg:text-bodyLarge"
			break
		default:
			headingStyles =
				"text-displaySmall md:text-displayMedium lg:text-displayLarge"
			break
	}

	console.log(headingStyles)

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
