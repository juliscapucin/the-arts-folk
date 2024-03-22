export default function Copyright() {
	const year = new Date().getFullYear()

	return (
		<div className='p-4 flex flex-col items-end text-bodySmall font-text'>
			<span>The Arts Folk ©{year}</span>
			<span>
				Website by{" "}
				<a
					href='https://juliscapucin.com'
					target='_blank'
					rel='noopener noreferrer'
				>
					JuliScapucin
				</a>
			</span>
		</div>
	)
}
