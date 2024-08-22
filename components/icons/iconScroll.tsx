import { IconArrow } from "."

export default function IconScroll() {
	return (
		<div
			className='flex flex-col items-center gap-8'
			aria-label='scroll up and down'
		>
			<IconArrow classes='rotate-180' />
			<span className='font-text -rotate-90'>Scroll</span>
			<IconArrow />
		</div>
	)
}
