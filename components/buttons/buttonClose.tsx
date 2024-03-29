import { MouseEventHandler } from "react"

interface ButtonCloseProps {
	action: MouseEventHandler<HTMLButtonElement>
	classes?: string
}

export default function ButtonClose({ action, classes }: ButtonCloseProps) {
	return (
		<button
			className={`hover:opacity-50 hover:rotate-90 transition-all ${classes}`}
			onClick={action}
			aria-label='close cookie window'
		>
			<div
				className={`h-12 w-12 flex flex-col justify-center items-center relative`}
			>
				<div
					className={`h-[1px] w-full bg-secondary rotate-45 origin-center`}
				></div>
				<div
					className={`h-[1px] w-full bg-secondary -rotate-45 origin-center`}
				></div>
			</div>
		</button>
	)
}
