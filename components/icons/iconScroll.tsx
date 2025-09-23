import { IconArrow } from '.'

export default function IconScroll() {
	return (
		<div
			className='flex flex-col items-center gap-8'
			aria-label='scroll up and down'>
			<IconArrow classes='scale-[90%] lg:scale-[100%] rotate-180' />
			<span className='font-text -rotate-90 text-label-medium md:text-label-large'>
				Scroll
			</span>
			<IconArrow classes='scale-[90%] lg:scale-[100%]' />
		</div>
	)
}
