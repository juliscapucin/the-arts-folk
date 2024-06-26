import { usePageContext } from "@/context"
import { Button } from "@/components/ui"

export default function Copyright() {
	const year = new Date().getFullYear()
	const { transitionOnClick } = usePageContext()

	return (
		<div className='absolute bottom-0 right-0 py-4 flex flex-col items-end text-labelSmall font-text'>
			<Button href={"impressum"} classes='underlined-link mb-4 uppercase'>
				Impressum
			</Button>
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
