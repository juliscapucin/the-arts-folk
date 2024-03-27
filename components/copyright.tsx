export default function Copyright() {
	const year = new Date().getFullYear()

	return (
		<div className='py-4 flex flex-col items-end text-labelSmall font-text'>
			<span>The Arts Folk ©{year}</span>
			<span>
				Website by{" "}
				<a
					href='https://juliscapucin.com'
					target='_blank'
					rel='noopener noreferrer'
					aria-label='Website By Juli Scapucin'
				>
					JuliScapucin
				</a>
			</span>
		</div>
	)
}
