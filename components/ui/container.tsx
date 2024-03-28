import React from "react"

type ContainerProps = {
	children: React.ReactNode
	classes?: string
	hasPadding?: boolean
	bgColor?: string
}

export default function Container({
	children,
	classes,
	hasPadding,
	bgColor,
}: ContainerProps) {
	return (
		<main
			className={`min-h-[--container-height-mobile] lg:min-h-[--container-height-desktop] mx-[--margin-mobile] lg:mx-[--margin-desktop] w-full max-w-desktop ${classes} ${
				hasPadding ? "px-[--padding-mobile] lg:px-[padding-desktop]" : ""
			} ${bgColor ? bgColor : "bg-primary"}`}
		>
			{children}
		</main>
	)
}
