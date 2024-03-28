import React from "react"

type ContainerProps = {
	children: React.ReactNode
	classes?: string
	hasPadding?: boolean
	bgColor?: string
	isDiv?: boolean
}

export default function Container({
	children,
	classes,
	hasPadding,
	bgColor,
	isDiv,
}: ContainerProps) {
	const HtmlTag = isDiv ? "div" : "main"

	return (
		<HtmlTag
			className={`min-h-[--container-height-mobile] lg:min-h-[--container-height-desktop] mx-[--margin-mobile] lg:mx-[--margin-desktop] max-w-desktop ${classes} ${
				hasPadding ? "px-[--padding-mobile] lg:px-[padding-desktop]" : ""
			} ${bgColor ? bgColor : "bg-primary"}`}
		>
			{children}
		</HtmlTag>
	)
}
