"use client"

import React, { forwardRef, Ref } from "react"
import Link from "next/link"
import { usePageContext } from "@/context"

// Define the props type for MyButton
type MyButtonProps = {
	href: string
	classes?: string
	children?: React.ReactNode
	transitionZIndex?: string
}

// Create MyButton component using forwardRef
const Button = forwardRef<HTMLAnchorElement, MyButtonProps>(
	({ href, classes, children, transitionZIndex }, ref) => {
		const { transitionOnClick, setTransitionIndex } = usePageContext()
		const slug =
			href && href.length > 0
				? href.startsWith("/")
					? href.slice(1)
					: href
				: "/"

		return (
			<Link href={href} passHref legacyBehavior>
				<a
					className={classes}
					href={href}
					onClick={(e) => {
						e.preventDefault()
						transitionZIndex
							? setTransitionIndex(transitionZIndex)
							: setTransitionIndex("z-transitionHigh")
						transitionOnClick(slug)
					}}
					ref={ref}
				>
					{children}
				</a>
			</Link>
		)
	}
)

// Set displayName for better debugging and error messages
Button.displayName = "Button"

export default Button
