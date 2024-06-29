import gsap from "gsap"
import { ScrollToPlugin } from "gsap/ScrollToPlugin"

export const handleImageSlide = (
	targetIndex: number,
	container: HTMLElement | null
) => {
	const targetPanel = document.querySelector(
		`[data-id=image-${targetIndex}]`
	) as HTMLDivElement
	let y = targetPanel?.offsetTop + 200 || 0

	gsap.registerPlugin(ScrollToPlugin)

	gsap.to(container ? container : window, {
		scrollTo: {
			y: y,
			autoKill: false,
		},
	})
}
