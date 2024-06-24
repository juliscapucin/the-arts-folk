"use client"

import { forwardRef } from "react"

type ContainerProps = {
	children: React.ReactNode
	classes?: string
	hasPadding?: boolean
	bgColor?: string
	isDiv?: boolean
}

const Container = forwardRef(
	(
		{ children, classes, hasPadding, bgColor, isDiv }: ContainerProps,
		ref?: React.Ref<HTMLDivElement>
	) => {
		const HtmlTag = isDiv ? "div" : "main"

		return (
			<HtmlTag
				ref={ref}
				className={`min-h-[--container-height-mobile] lg:min-h-[--container-height-desktop] ${classes} ${
					hasPadding ? "px-[--padding-mobile] lg:px-[padding-desktop]" : ""
				} ${bgColor ? bgColor : "bg-primary"}`}
			>
				{children}
			</HtmlTag>
		)
	}
)

export default Container
