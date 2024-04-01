type IconArrowProps = {
	classes?: string
}

export default function IconArrow({ classes }: IconArrowProps) {
	return (
		<div className={`${classes}`}>
			<svg
				width='29'
				height='39'
				viewBox='0 0 29 39'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M1.00501 25.5474L14.4637 38.3723L27.9223 25.5474'
					stroke='black'
					strokeWidth='0.910912'
				/>
				<path
					d='M14.4637 0.281792V37.9342'
					stroke='black'
					strokeWidth='0.910912'
				/>
			</svg>
		</div>
	)
}
