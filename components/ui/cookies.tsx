"use client"

import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Link from "next/link"
import { PortableText } from "@portabletext/react"

import gsap from "gsap"

import { ButtonClose } from "@/components/buttons"
import { Container, Heading } from "@/components/ui"
import { useCookieStorage } from "@/hooks"

import { Page } from "@/types"

type CookiesProps = {
	cookieData: Page
}

export default function Cookies({ cookieData }: CookiesProps) {
	const { cookie, setCookie, updateCookie } = useCookieStorage()
	const [isOverlayOpen, setIsOverlayOpen] = useState(false)
	const cookieRef = useRef<HTMLDivElement>(null)
	const overlayRef = useRef<HTMLDivElement>(null)

	// Cookie button
	useLayoutEffect(() => {
		if (!cookieRef.current || cookie === "true") return
		gsap.set(overlayRef.current, { yPercent: 120 })
		gsap.to(cookieRef.current, {
			xPercent: -100,
			duration: 0.2,
			ease: "power4.out",
			delay: 2.7,
		})
	}, [])

	// Cookie Policy overlay
	const toggleOverlay = () => {
		if (!overlayRef.current) return

		const isOpen = !isOverlayOpen

		setIsOverlayOpen(isOpen)

		let ctx = gsap.context(() => {
			gsap.to(overlayRef.current, {
				yPercent: isOpen ? 0 : 120,
				duration: 0.4,
				ease: "power2.out",
				// onComplete: () => setIsOverlayOpen(isOpen),
			})
		}, overlayRef)

		return () => {
			ctx.revert()
		}
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape" && isOverlayOpen) {
				toggleOverlay()
			}
		}

		window.addEventListener("keydown", handleKeyDown)

		return () => {
			window.removeEventListener("keydown", handleKeyDown)
		}
	}, [toggleOverlay])

	if (cookie === "true") return null

	const okButtonHandler = (cookie: string) => {
		updateCookie(cookie)

		if (!cookieRef.current) return
		gsap.to(cookieRef.current, {
			xPercent: 100,
			duration: 0.2,
			ease: "power4.in",
			onComplete: () => {
				setCookie(cookie)
			},
		})
	}

	{
		return (
			cookieData &&
			cookie !== "true" && (
				<>
					{/* White overlay */}
					<div
						className={`background-white fixed top-[--header-height-mobile] lg:top-[--header-height-desktop] max-w-desktop mx-auto left-0 right-0 bottom-0 flex items-end justify-end z-cookies overflow-clip pointer-events-none transition-colors duration-300 ${
							isOverlayOpen ? "md:bg-primary/80" : ""
						}`}
					>
						{/* Cookie button */}
						<div
							ref={cookieRef}
							className='translate-x-full space-x-4 bg-secondary text-primary px-3 py-2 pointer-events-auto mb-8'
						>
							<Link href='/' passHref legacyBehavior>
								<button
									onClick={(e) => {
										e.preventDefault()
										toggleOverlay()
									}}
									className='underlined-link uppercase font-text font-extralight text-bodySmall tracking-wider text-primary select-none'
								>
									This site uses cookies
								</button>
							</Link>
							<button
								className='text-bodySmall'
								onClick={() => okButtonHandler("true")}
							>
								OK
							</button>
						</div>
					</div>

					{/* Cookie Policy overlay */}
					<div
						className={`fixed w-full top-0 left-0 right-0 bottom-8 pr-0 max-w-desktop mx-auto overflow-clip z-cookiesOverlay ${
							isOverlayOpen ? "pointer-events-auto" : "pointer-events-none"
						}`}
					>
						<ButtonClose
							classes={`fixed top-[--header-height-mobile] mx-auto w-full pr-4 max-w-desktop mt-4 flex justify-end z-100`}
							action={toggleOverlay}
							color={isOverlayOpen ? "primary" : "transparent"}
						/>

						{/* Gradients */}
						<div
							className={`absolute top-[--header-height-mobile] right-10 w-[98%] md:w-[70%] lg:w-[35%] h-16 ml-auto bg-gradient-to-b from-20% bg-gradient-middle from-secondary to-transparent z-80 ${
								isOverlayOpen
									? "transition-opacity duration-300 delay-300"
									: "opacity-0"
							}`}
						></div>
						<div
							className={`absolute bottom-0 right-10 w-[98%] md:w-[70%] lg:w-[35%] h-16 ml-auto bg-gradient-to-t from-20% bg-gradient-middle from-secondary to-transparent z-80 ${
								isOverlayOpen ? "" : "opacity-0"
							}`}
						></div>

						{/* Overlay Content */}
						<div
							ref={overlayRef}
							className='cookies-overlay gutter-stable relative w-full md:w-3/4 lg:w-2/5 ml-auto mr-0 bg-secondary text-primary h-full pb-8 overflow-y-scroll'
						>
							<div className='custom-rich-text w-full px-4 lg:px-12 pb-12'>
								<Heading
									tag='h1'
									variant='headline'
									classes='mb-16 mt-24 lg:mt-16'
								>
									{cookieData.title}
								</Heading>
								<PortableText value={cookieData.content} />
							</div>
						</div>
					</div>
				</>
			)
		)
	}
}
