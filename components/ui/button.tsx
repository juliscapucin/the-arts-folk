import React, { forwardRef, Ref } from "react"
import { usePageContext } from "@/context"

// Define the props type for MyButton
type MyButtonProps = {
	href?: string
	classes?: string
	children?: React.ReactNode
}

// Create MyButton component using forwardRef
const Button = forwardRef<HTMLAnchorElement, MyButtonProps>(
	({ href, classes, children }, ref) => {
		const { transitionOnClick } = usePageContext()
		const slug = href && href.length > 0 ? href.split("/").pop() ?? "/" : "/"

		return (
			<a
				className={classes}
				href={href}
				onClick={() => transitionOnClick(slug)}
				ref={ref}
			>
				{children}
			</a>
		)
	}
)

// Set displayName for better debugging and error messages
Button.displayName = "Button"

export default Button
