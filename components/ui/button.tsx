'use client'

import { usePageContext } from '@/context'
import Link from 'next/link'
import React, { forwardRef, MouseEventHandler } from 'react'

type MyButtonProps = {
	href: string
	classes?: string
	children?: React.ReactNode
	transitionZIndex?: string
	isVideo?: boolean
	prefetch?: boolean
	handleMouseEnter?: MouseEventHandler<HTMLAnchorElement> | undefined
	handleMouseLeave?: MouseEventHandler<HTMLAnchorElement> | undefined
}

const Button = forwardRef<HTMLAnchorElement, MyButtonProps>(
	(
		{
			href,
			classes,
			children,
			transitionZIndex,
			isVideo,
			prefetch,
			handleMouseEnter,
			handleMouseLeave,
		},
		ref
	) => {
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
)

// Set displayName for better debugging and error messages
Button.displayName = 'Button'

export default Button
