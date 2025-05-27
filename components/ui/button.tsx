'use client'

import { usePageContext } from '@/context'
import Link from 'next/link'
import { MouseEventHandler } from 'react'

type MyButtonProps = {
	ref?: React.Ref<HTMLAnchorElement> | undefined
	href: string
	classes?: string
	children?: React.ReactNode
	transitionZIndex?: string
	isVideo?: boolean
	prefetch?: boolean
	handleMouseEnter?: MouseEventHandler<HTMLAnchorElement> | undefined
	handleMouseLeave?: MouseEventHandler<HTMLAnchorElement> | undefined
}

export default function Button({
	ref,
	href,
	classes,
	children,
	transitionZIndex,
	isVideo,
	prefetch,
	handleMouseEnter,
	handleMouseLeave,
}: MyButtonProps) {
	const { transitionOnClick, setTransitionIndex } = usePageContext()
	const slug =
		href && href.length > 0
			? href.startsWith('/')
				? href.slice(1)
				: href
			: '/'

	return isVideo ? (
		<a
			className={`${classes}`}
			href={href}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onClick={(e) => {
				e.preventDefault()
				transitionZIndex
					? setTransitionIndex(transitionZIndex)
					: setTransitionIndex('z-transitionHigh')
				transitionOnClick(slug)
			}}
			ref={ref}>
			{children}
		</a>
	) : (
		<Link
			className={classes}
			href={href}
			prefetch={prefetch}
			onClick={(e) => {
				e.preventDefault()
				transitionZIndex
					? setTransitionIndex(transitionZIndex)
					: setTransitionIndex('z-transitionHigh')
				transitionOnClick(slug)
			}}
			ref={ref}>
			{children}
		</Link>
	)
}
