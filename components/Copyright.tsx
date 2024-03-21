export default function Copyright() {
	const year = new Date().getFullYear()

	return (
		<div className='flex flex-col text-bodySmall font-text'>
			<span>The Arts Folk ©{year}</span>
			<span>
				Website by{" "}
				<a href='https://juliscapucin.com' target='_blank'>
					JuliScapucin
				</a>
			</span>
		</div>
	)
}
