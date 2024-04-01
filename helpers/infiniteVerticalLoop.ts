import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

interface LoopConfig {
	onChange?: any
	paddingRight?: string
	paddingBottom?: string
	reversed?: any
	snap?: number | number[] | boolean
	speed: number
	repeat: number
	paused: boolean
	center?: boolean
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

export function infiniteVerticalLoop(items: HTMLElement[], config: LoopConfig) {
	items = gsap.utils.toArray(items)
	config = config || {}
	let onChange = config.onChange,
		lastIndex = 0,
		tl = gsap.timeline({
			repeat: config.repeat,
			onUpdate:
				onChange &&
				function () {
					let i = tl.closestIndex()
					if (lastIndex !== i) {
						lastIndex = i
						onChange(items[i], i)
					}
				},
			paused: config.paused,
			defaults: { ease: "none" },
			onReverseComplete: (): void => {
				tl.totalTime(tl.rawTime() + tl.duration() * 100)
			},
		}),
		length = items.length,
		startY = items[0].offsetTop,
		times: any[] = [],
		heights: number[] = [],
		spaceBefore: number[] = [],
		yPercents: any[] = [],
		curIndex = 0,
		center = config.center,
		totalHeight: number,
		timeOffset = 0,
		timeWrap: (arg0: number) => gsap.Position | undefined,
		proxy: any
	const clone = (obj: { [key: string]: any }) => {
			let result: { [key: string]: any } = {}, // Explicitly type 'result' here
				p
			for (p in obj) {
				result[p] = obj[p]
			}
			return result
		},
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
		container = items[0].parentNode as HTMLElement
	// container =
	// 	center === true
	// 		? items[0].parentNode
	// 		: gsap.utils.toArray(center)[0] || items[0].parentNode,

	const getTotalHeight = () => {
			return (
				items[length - 1].offsetTop +
				(yPercents[length - 1] / 100) * heights[length - 1] -
				startY +
				spaceBefore[0] +
				items[length - 1].offsetHeight *
					Number(gsap.getProperty(items[length - 1], "scaleY")) +
				(Number(config.paddingBottom) || 0)
			)
		},
		populateHeights = () => {
			if (!container) return
			let b1 = container.getBoundingClientRect(),
				b2
			startY = items[0].offsetTop
			items.forEach((el, i) => {
				heights[i] = parseFloat(gsap.getProperty(el, "height", "px").toString())
				yPercents[i] = snap(
					(parseFloat(gsap.getProperty(el, "y", "px").toString()) /
						heights[i]) *
						100 +
						Number(gsap.getProperty(el, "yPercent"))
				)
				b2 = el.getBoundingClientRect()
				spaceBefore[i] = b2.top - (i ? b1.bottom : b1.top)
				b1 = b2
			})
			gsap.set(items, {
				// convert "x" to "xPercent" to make things responsive, and populate the widths/xPercents Arrays to make lookups faster.
				yPercent: (i) => yPercents[i],
			})
			totalHeight = getTotalHeight()
		},
		populateOffsets = () => {
			if (!container) return
			const containerElement = container as HTMLElement // Cast 'container' to HTMLElement type
			timeOffset = center
				? (tl.duration() * (containerElement.offsetWidth / 2)) / totalHeight // Use 'containerElement.offsetWidth' instead of 'container.offsetWidth'
				: 0
			center &&
				times.forEach((t, i) => {
					times[i] = timeWrap(
						tl.labels["label" + i] +
							(tl.duration() * heights[i]) / 2 / totalHeight -
							timeOffset
					)
				})
		},
		getClosest = (values: string | any[], value: number, wrap: number) => {
			if (!value) return
			let i = values.length,
				closest = 1e10,
				index = 0,
				d
			while (i--) {
				d = Math.abs(values[i] - value)
				if (d > wrap / 2) {
					d = wrap - d
				}
				if (d < closest) {
					closest = d
					index = i
				}
			}
			return index
		},
		populateTimeline = () => {
			let i, item, curY, distanceToStart, distanceToLoop
			tl.clear()
			for (i = 0; i < length; i++) {
				item = items[i]
				curY = (yPercents[i] / 100) * heights[i]
				distanceToStart = item.offsetTop + curY - startY + spaceBefore[0]
				distanceToLoop =
					distanceToStart +
					heights[i] * Number(gsap.getProperty(item, "scaleY"))
				tl.to(
					item,
					{
						yPercent: snap(((curY - distanceToLoop) / heights[i]) * 100),
						duration: distanceToLoop / pixelsPerSecond,
					},
					0
				)
					.fromTo(
						item,
						{
							yPercent: snap(
								((curY - distanceToLoop + totalHeight) / heights[i]) * 100
							),
						},
						{
							yPercent: yPercents[i],
							duration:
								(curY - distanceToLoop + totalHeight - curY) / pixelsPerSecond,
							immediateRender: false,
						},
						distanceToLoop / pixelsPerSecond
					)
					.add("label" + i, distanceToStart / pixelsPerSecond)
				times[i] = distanceToStart / pixelsPerSecond
			}
			timeWrap = gsap.utils.wrap(0, tl.duration())
		},
		customAnimations = () => {
			let { enterAnimation, leaveAnimation } = config,
				eachDuration = tl.duration() / items.length
			items.forEach((item, i) => {
				let anim = enterAnimation && enterAnimation(item, eachDuration, i),
					isAtEnd =
						anim &&
						tl.duration() -
							Number(
								timeWrap(times[i] - Math.min(eachDuration, anim.duration()))
							) <
							eachDuration - 0.05
				anim && tl.add(anim, isAtEnd ? 0 : timeWrap(times[i] - anim.duration()))
				anim = leaveAnimation && leaveAnimation(item, eachDuration, i)
				isAtEnd = times[i] === tl.duration()
				anim && anim.duration() > eachDuration && anim.duration(eachDuration)
				anim && tl.add(anim, isAtEnd ? 0 : times[i])
			})
		},
		refresh = (deep: boolean | undefined) => {
			let progress = tl.progress()
			tl.progress(0, true)
			populateHeights()
			deep && populateTimeline()
			populateOffsets()
			customAnimations()
			deep && tl.draggable
				? tl.time(times[curIndex], true)
				: tl.progress(progress, true)
		}

	gsap.set(items, { y: 0 })
	populateHeights()
	populateTimeline()
	populateOffsets()
	customAnimations()

	window.addEventListener("resize", () => refresh(true))
	function toIndex(index: number, vars: any) {
		vars = clone(vars)
		Math.abs(index - curIndex) > length / 2 &&
			(index += index > curIndex ? -length : length) // always go in the shortest direction
		let newIndex = gsap.utils.wrap(0, length, index),
			time = times[newIndex]
		if (time > tl.time() !== index > curIndex) {
			// if we're wrapping the timeline's playhead, make the proper adjustments
			time += tl.duration() * (index > curIndex ? 1 : -1)
		}
		if (vars.revolutions) {
			time += tl.duration() * Math.round(vars.revolutions)
			delete vars.revolutions
		}
		if (time < 0 || time > tl.duration()) {
			vars.modifiers = { time: timeWrap }
		}
		curIndex = newIndex
		vars.overwrite = true
		gsap.killTweensOf(proxy)
		return tl.tweenTo(time, vars)
	}
	tl.elements = items
	tl.next = (vars: any) => toIndex(curIndex + 1, vars)
	tl.previous = (vars: any) => toIndex(curIndex - 1, vars)
	tl.current = () => curIndex
	tl.toIndex = (index: number, vars: any) => toIndex(index, vars)
	tl.closestIndex = (setCurrent: any) => {
		let index = getClosest(times, tl.time(), tl.duration())
		setCurrent && index && (curIndex = index)
		return index
	}
	tl.times = times
	tl.progress(1, true).progress(0, true) // pre-render for performance
	if (config.reversed && tl.vars.onReverseComplete) {
		tl.vars.onReverseComplete()
		tl.reverse()
	}
	if (config.draggable && typeof Draggable === "function") {
		proxy = document.createElement("div")
		const align = () => {
			tl.progress(
				wrap(startProgress + (draggable.startY - draggable.y) * ratio)
			)
		}
		let wrap = gsap.utils.wrap(0, 1),
			ratio: any,
			startProgress: any,
			draggable: any,
			dragSnap,
			syncIndex = () => tl.closestIndex(true)
		typeof InertiaPlugin === "undefined" &&
			console.warn(
				"InertiaPlugin required for momentum-based scrolling and snapping. https://greensock.com/club"
			)
		draggable = Draggable.create(proxy, {
			trigger: items[0].parentNode as Element,
			type: "y",
			onPressInit() {
				gsap.killTweensOf(tl)
				startProgress = tl.progress()
				refresh(false)
				ratio = 1 / totalHeight
				gsap.set(proxy, { y: startProgress / -ratio })
			},
			onDrag: align,
			onThrowUpdate: align,
			inertia: true,
			snap: (value) => {
				let time = -(value * ratio) * tl.duration(),
					wrappedTime = timeWrap(time),
					closestIndex = getClosest(
						times,
						// TODO: made changes here that might break functionality
						wrappedTime ? Number(wrappedTime) : 0,
						tl.duration()
					),
					snapTime = times[closestIndex ? closestIndex : 0],
					dif = snapTime - Number(wrappedTime)
				Math.abs(dif) > tl.duration() / 2 &&
					(dif += dif < 0 ? tl.duration() : -tl.duration())
				return (time + dif) / tl.duration() / -ratio
			},
			onRelease: syncIndex,
			onThrowComplete: syncIndex,
		})[0]
		tl.draggable = draggable
	}
	tl.closestIndex(true)
	onChange && onChange(items[curIndex], curIndex)

	return tl
}
