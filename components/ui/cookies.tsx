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
		gsap.set(overlayRef.current, { yPercent: 100 })
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

		let ctx = gsap.context(() => {
			gsap.to(overlayRef.current, {
				yPercent: isOpen ? -90 : 100,
				duration: 0.5,
				ease: "power2.out",
				onComplete: () => setIsOverlayOpen(isOpen),
			})
		}, overlayRef)

		return () => {
			ctx.revert()
		}
	}

	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
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
					{/* Cookie button */}
					<Container
						classes='absolute top-[--header-height-mobile] lg:top-[--header-height-desktop] left-0 right-0 flex items-end justify-end z-50 overflow-clip pointer-events-none transition-colors duration-300'
						bgColor={isOverlayOpen ? "bg-primary/80" : "transparent"}
						isDiv={true}
						hasPadding={false}
					>
						<div
							ref={cookieRef}
							className='translate-x-full space-x-4 bg-secondary text-primary px-3 py-2 pointer-events-auto'
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
					</Container>

					{/* Cookie Policy overlay */}
					<Container
						classes={`absolute top-[--container-height-mobile] lg:top-[--header-height-desktop] left-0 h-svh max-h-[--container-height-mobile] lg:max-h-[--container-height-desktop] z-80 ${
							isOverlayOpen ? "pointer-events-auto" : "pointer-events-none"
						}`}
						isDiv={true}
						hasPadding={false}
						bgColor='transparent'
					>
						<ButtonClose
							classes={`fixed top-[--header-height-mobile] mx-auto w-full pr-20 max-w-desktop mt-4 flex justify-end z-100 ${
								isOverlayOpen ? "opacity-100" : "opacity-0"
							}`}
							action={toggleOverlay}
							color='primary'
						/>

						<div
							ref={overlayRef}
							className='w-full lg:w-2/5 ml-auto bg-secondary text-primary h-svh max-h-[--container-height-mobile] lg:max-h-[--container-height-desktop] overflow-y-scroll'
						>
							<div className='custom-rich-text px-12'>
								<Heading
									tag='h1'
									variant='headline'
									classes='mb-16 mt-12 lg:mt-16'
								>
									{cookieData.title}
								</Heading>
								<PortableText value={cookieData.content} />
							</div>
						</div>
					</Container>
				</>
			)
		)
	}
}
