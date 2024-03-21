import React from "react"

type ContainerProps = {
	children: React.ReactNode
	classes?: string
}

export default function Container({ children, classes }: ContainerProps) {
	return (
		<main
			className={`min-h-[--container-height-mobile] lg:min-h-[--container-height-desktop] px-[--padding-mobile] lg:px-[--padding-desktop] mx-[--padding-mobile] lg:mx-[--padding-desktop] bg-primary ${classes}`}
		>
			{children}
		</main>
	)
}
