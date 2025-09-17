'use client'

import { createContext, useContext, useState } from 'react'

import gsap from 'gsap'

import { NavLink } from '@/types'

interface ContextProps {
	handleTransitionOnClick: (link: NavLink | string | (() => void)) => void
	handleTransitionEnd: () => void
	transitionIndex: string
	setTransitionIndex: React.Dispatch<React.SetStateAction<string>>
	isTransitioning: boolean
	link: NavLink | string | (() => void) | null
}

// CREATE CONTEXT
const PageContext = createContext<ContextProps | null>(null)

// CONTEXT PROVIDER
export const PageContextProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [transitionIndex, setTransitionIndex] = useState('z-transitionHigh')
	const [isTransitioning, setIsTransitioning] = useState(false)
	const [link, setLink] = useState<NavLink | string | (() => void) | null>(null)

	const handleTransitionOnClick = (link: NavLink | string | (() => void)) => {
		if (isTransitioning) return
		setIsTransitioning(true)
		setLink(link)
	}

	const handleTransitionEnd = () => {
		setIsTransitioning(false)
		setLink(null)
	}

	return (
		<PageContext.Provider
			value={{
				handleTransitionOnClick,
				handleTransitionEnd,
				transitionIndex,
				setTransitionIndex,
				isTransitioning,
				link,
			}}>
			{children}
		</PageContext.Provider>
	)
}

// CONTEXT CUSTOM HOOK
export const usePageContext = () => {
	const context = useContext(PageContext)
	if (!context)
		throw new Error('usePageContext must be used within PageContextProvider')
	return context
}
