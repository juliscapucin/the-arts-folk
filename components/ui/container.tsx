import React from "react"

type ContainerProps = {
	children: React.ReactNode
	classes?: string
}

export default function Container({ children, classes }: ContainerProps) {
	return (
		<main
			className={`h-[--container-height-mobile] lg:h-[--container-height-desktop] lg:px-[--padding-desktop] mx-[--padding-mobile] lg:mx-[--padding-desktop] bg-primary ${classes}`}
		>
			{children}
		</main>
	)
}
