import { MouseEventHandler } from "react"

interface ButtonBurgerProps {
	action: MouseEventHandler<HTMLButtonElement>
	isOpen: boolean
}

export default function ButtonBurger({ action, isOpen }: ButtonBurgerProps) {
	return (
		<button onClick={action} aria-label='open menu'>
			<div
				className={`h-12 w-12 flex flex-col justify-center items-center relative ${
					isOpen ? "" : "gap-3"
				}`}
			>
				<div
					className={`h-[1px] w-full ${
						isOpen ? "bg-primary rotate-45 origin-center" : "bg-secondary"
					}`}
				></div>
				<div
					className={`h-[1px] w-full ${
						isOpen ? "bg-primary -rotate-45 origin-center" : "bg-secondary"
					}`}
				></div>
			</div>
		</button>
	)
}
