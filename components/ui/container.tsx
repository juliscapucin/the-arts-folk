import React from "react"

type ContainerProps = {
	children: React.ReactNode
	classes?: string
	hasPadding?: boolean
}

export default function Container({
	children,
	classes,
	hasPadding,
}: ContainerProps) {
	return (
		<main
			className={`min-h-[--container-height-mobile] lg:min-h-[--container-height-desktop] mx-[--padding-mobile] lg:mx-[--padding-desktop] bg-primary ${classes} ${
				hasPadding ? "px-[--padding-mobile] lg:px-[--padding-desktop]" : ""
			}`}
		>
			{children}
		</main>
	)
}
