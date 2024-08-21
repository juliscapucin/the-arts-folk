"use client"

import { usePathname, useRouter } from "next/navigation"
import {
	createContext,
	useContext,
	useLayoutEffect,
	useRef,
	useState,
} from "react"

import gsap from "gsap"

import { NavLink } from "@/types"

// TYPE
interface ContextProps {
	pageTransitionRef: React.MutableRefObject<HTMLDivElement | null>
	transitionOnClick: (link: NavLink | string | (() => void)) => void
	transitionIndex: string
	setTransitionIndex: React.Dispatch<React.SetStateAction<string>>
}

// CREATE CONTEXT
const PageContext = createContext<ContextProps | null>(null)

// CONTEXT PROVIDER
export const PageContextProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const pageTransitionRef = useRef<HTMLDivElement | null>(null)
	const pathname = usePathname()
	const router = useRouter()
	let ctx = gsap.context(() => {})
	const [transitionIndex, setTransitionIndex] = useState("z-transitionHigh")

	const animateMobileMenu = (mobileMenuRef: HTMLDivElement) => {
		console.log("animate mobile menu")
	}

	// On page Exit
	const transitionOnClick = (link: any) => {
		// TODO: Toggle mobile menu
		// if (mobileMenuRef) {
		// 	animateMobileMenu(mobileMenuRef)
		// }

		if (!pageTransitionRef.current) return

		gsap.set(pageTransitionRef.current, { yPercent: -100 })

		gsap.to(pageTransitionRef.current, {
			yPercent: 0,
			duration: 0.4,
			ease: "linear",
			onComplete: () => {
				link === "back"
					? router.back()
					: router.push(link.slug ? `/${link.slug}` : `/${link}`)
			},
		})
	}

	// On page Enter
	// useLayoutEffect(() => {
	// 	if (!pageTransitionRef) return

	// 	// gsap.set(pageTransitionRef, { yPercent: 0 })

	// 	console.log("hi")

	// 	ctx.add(() => {
	// 		gsap.to(pageTransitionRef, {
	// 			yPercent: 100,
	// 			duration: 0.4,
	// 			ease: "linear",
	// 		})
	// 	})
	// }, [pathname])

	return (
		<PageContext.Provider
			value={{
				transitionOnClick,
				pageTransitionRef,
				transitionIndex,
				setTransitionIndex,
			}}
		>
			{children}
		</PageContext.Provider>
	)
}

// CONTEXT CUSTOM HOOK
export const usePageContext = () => {
	const context = useContext(PageContext)
	if (!context)
		throw new Error("usePageContext must be used within PageContextProvider")
	return context
}
