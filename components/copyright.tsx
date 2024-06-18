export default function Copyright() {
	const year = new Date().getFullYear()

	return (
		<div className='py-4 flex flex-col items-end text-labelSmall font-text'>
			<a href='/impressum' className='mb-4 underline hover:text-faded-50'>
				Impressum
			</a>
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
