import { IconArrow } from "."

export default function IconScroll() {
	return (
		<div
			className='flex flex-col items-center gap-16'
			aria-label='scroll up and down'
		>
			<IconArrow classes='rotate-180' />
			{/* <span className='block font-text text-labelSmall -rotate-90'>SCROLL</span> */}
			<IconArrow />
		</div>
	)
}
