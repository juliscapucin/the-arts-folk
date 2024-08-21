import { MouseEventHandler } from "react"

interface ButtonCloseProps {
	action: MouseEventHandler<HTMLButtonElement>
	classes?: string
	color?: "primary" | "secondary" | "transparent"
	mixBlend?: boolean
}

export default function ButtonClose({
	action,
	classes,
	color,
	mixBlend,
}: ButtonCloseProps) {
	let bgColor = ""

	switch (color) {
		case "primary":
			bgColor = "bg-primary"
			break
		case "secondary":
			bgColor = "bg-secondary"
			break
		case "transparent":
			bgColor = "bg-transparent"
			break
		default:
			bgColor = "bg-secondary"
			break
	}
	return (
		<button
			className={`relative hover:opacity-50 transition-all duration-500 ${classes}`}
			onClick={action}
			aria-label='close cookie window'
		>
			<div
				className={`h-12 w-12 flex flex-col justify-center items-center relative`}
			>
				<div
					className={`h-[1px] w-full rotate-45 origin-center ${bgColor} ${
						mixBlend ? "mix-blend-difference" : ""
					}`}
				></div>
				<div
					className={`h-[1px] w-full -rotate-45 origin-center ${bgColor} ${
						mixBlend ? "mix-blend-difference" : ""
					}`}
				></div>
			</div>
		</button>
	)
}
