type IconChevronProps = {
	classes?: string
}

export default function IconChevron({ classes }: IconChevronProps) {
	return (
		<div className={classes}>
			<svg
				width='22'
				height='12'
				viewBox='0 0 22 12'
				fill='none'
				xmlns='http://www.w3.org/2000/svg'
			>
				<path
					d='M1 1L11.3424 10.8554L21.6849 1'
					stroke='black'
					strokeWidth='0.7'
				/>
			</svg>
		</div>
	)
}
