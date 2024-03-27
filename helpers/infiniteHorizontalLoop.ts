import { gsap } from "gsap"

interface LoopConfig {
	onChange: any
	paddingRight: string
	reversed: any
	snap: number | number[] | boolean
	speed: number
	repeat: number
	paused: boolean
	center: boolean
	draggable: boolean
	inertia: boolean
	enterAnimation?: (
		item: any,
		maxDuration: number,
		index: number
	) => GSAPAnimation
	leaveAnimation?: (
		item: any,
		maxDuration: number,
		index: number
	) => GSAPAnimation
}

export function infiniteHorizontalLoop(
	items: HTMLElement[],
	config: LoopConfig
) {
	items = gsap.utils.toArray(items)
	config = config || {}
	let tl = gsap.timeline({
			repeat: config.repeat,
			paused: config.paused,
			defaults: { ease: "none" },
			onReverseComplete: (): void => {
				tl.totalTime(tl.rawTime() + tl.duration() * 100)
			},
		}),
		length = items.length,
		startY = items[0].offsetLeft,
		times: any[] = [],
		heights: number[] = [],
		yPercents: any[] = [],
		curIndex = 0,
		pixelsPerSecond = (config.speed || 1) * 100,
		// snap = config.snap === false ? (v) => v : gsap.utils.snap(config.snap || 1), // some browsers shift by a pixel to accommodate flex layouts, so for example if width is 20% the first element's width might be 242px, and the next 243px, alternating back and forth. So we snap to 5 percentage points to make things look more natural
		snap =
			config.snap === false
				? (v: number) => v
				: gsap.utils.snap(
						typeof config.snap === "number" || Array.isArray(config.snap)
							? config.snap
							: 1
				  ),
		totalWidth,
		curX,
		distanceToStart,
		distanceToLoop,
		item,
		i
	gsap.set(items, {
		// convert "x" to "xPercent" to make things responsive, and populate the heights/yPercents Arrays to make lookups faster.
		xPercent: (i, el) => {
			let w = (heights[i] = parseFloat(
				gsap.getProperty(el, "width", "px").toString()
			))
			yPercents[i] = snap(
				(parseFloat(gsap.getProperty(el, "x", "px").toString()) / w) * 100 +
					parseFloat(gsap.getProperty(el, "xPercent") as string)
			).toString()
			return yPercents[i]
		},
	})
	gsap.set(items, { x: 0 })
	totalWidth =
		items[length - 1].offsetLeft +
		(yPercents[length - 1] / 100) * heights[length - 1] -
		startY +
		items[length - 1].offsetWidth *
			Number(gsap.getProperty(items[length - 1], "scaleX")) +
		(parseFloat(config.paddingRight) || 0)
	for (i = 0; i < length; i++) {
		item = items[i]
		curX = (yPercents[i] / 100) * heights[i]
		distanceToStart = item.offsetLeft + curX - startY
		distanceToLoop =
			distanceToStart + heights[i] * Number(gsap.getProperty(item, "scaleX"))
		tl.to(
			item,
			{
				xPercent: snap(((curX - distanceToLoop) / heights[i]) * 100),
				duration: distanceToLoop / pixelsPerSecond,
			},
			0
		)
			.fromTo(
				item,
				{
					xPercent: snap(
						((curX - distanceToLoop + totalWidth) / heights[i]) * 100
					),
				},
				{
					xPercent: yPercents[i],
					duration:
						(curX - distanceToLoop + totalWidth - curX) / pixelsPerSecond,
					immediateRender: false,
				},
				distanceToLoop / pixelsPerSecond
			)
			.add("label" + i, distanceToStart / pixelsPerSecond)
		times[i] = distanceToStart / pixelsPerSecond
	}
	function toIndex(index: number, vars: gsap.TweenVars | undefined) {
		vars = vars || {}
		Math.abs(index - curIndex) > length / 2 &&
			(index += index > curIndex ? -length : length) // always go in the shortest direction
		let newIndex = gsap.utils.wrap(0, length, index),
			time = times[newIndex]
		if (time > tl.time() !== index > curIndex) {
			// if we're wrapping the timeline's playhead, make the proper adjustments
			vars.modifiers = { time: gsap.utils.wrap(0, tl.duration()) }
			time += tl.duration() * (index > curIndex ? 1 : -1)
		}
		curIndex = newIndex
		vars.overwrite = true
		return tl.tweenTo(time, vars)
	}
	tl.next = (vars: gsap.TweenVars | undefined) => toIndex(curIndex + 1, vars)
	tl.previous = (vars: gsap.TweenVars | undefined) =>
		toIndex(curIndex - 1, vars)
	tl.current = () => curIndex
	tl.toIndex = (index: number, vars: gsap.TweenVars | undefined) =>
		toIndex(index, vars)
	tl.times = times
	tl.progress(1, true).progress(0, true) // pre-render for performance
	if (config.reversed && tl.vars.onReverseComplete) {
		tl.vars.onReverseComplete()
		tl.reverse()
	}
	return tl
}
