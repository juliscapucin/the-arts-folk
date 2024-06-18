import { usePageContext } from "@/context"

export default function Copyright() {
	const year = new Date().getFullYear()
	const { transitionOnClick } = usePageContext()

	return (
		<div className='py-4 flex flex-col items-end text-labelSmall font-text'>
			<button
				onClick={() => transitionOnClick("impressum")}
				className='mb-4 underline hover:text-faded-50 uppercase'
			>
				Impressum
			</button>
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
