import React, { forwardRef, Ref } from "react"
import { usePageContext } from "@/context"

// Define the props type for MyButton
type MyButtonProps = {
	href?: string
	classes?: string
	label: string
}

// Create MyButton component using forwardRef
const Button = forwardRef<HTMLAnchorElement, MyButtonProps>(
	({ href, classes, label }, ref) => {
		const { transitionOnClick } = usePageContext()

		return (
			<a
				className={classes}
				href={href}
				onClick={() => transitionOnClick(`info`)}
				ref={ref}
			>
				{label}
			</a>
		)
	}
)

// Set displayName for better debugging and error messages
Button.displayName = "Button"

export default Button
