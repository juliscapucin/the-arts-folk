import { Button } from "@/components/ui"

export default function Copyright() {
	const year = new Date().getFullYear()

	return (
		<div className='mb-8 lg:mb-0 lg:absolute right-[--margin-mobile] lg:right-[--margin-desktop] bottom-8 flex flex-col items-end text-labelSmall font-text'>
			{/* <Button href={"impressum"} classes='underlined-link mb-4 uppercase'>
				Impressum
			</Button> */}
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
