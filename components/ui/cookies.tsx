"use client"

import { useLayoutEffect, useRef, useState } from "react"
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

	// Cookie Policy overlay
	const toggleOverlay = () => {
		if (!overlayRef.current) return

		const isOpen = !isOverlayOpen

		let ctx = gsap.context(() => {
			gsap.to(overlayRef.current, {
				yPercent: isOpen ? 0 : 100,
				duration: 0.5,
				ease: "power2.out",
				onComplete: () => setIsOverlayOpen(isOpen),
			})
		}, overlayRef)

		return () => {
			ctx.revert()
		}
	}

	{
		return (
			cookieData &&
			cookie !== "true" && (
				<>
					{/* Cookie button */}
					<Container
						classes='absolute top-[--header-height-mobile] lg:top-[--header-height-desktop] left-0 right-0 flex items-end justify-end z-100 overflow-clip pointer-events-none'
						bgColor='transparent'
						isDiv={true}
						hasPadding={false}
					>
						<div
							ref={cookieRef}
							className='translate-x-full space-x-4 bg-secondary text-primary p-4 pointer-events-auto'
						>
							<Link href='/' passHref legacyBehavior>
								<button
									onClick={(e) => {
										e.preventDefault()
										toggleOverlay()
									}}
									className='underlined-link uppercase font-text font-extralight text-bodyMedium tracking-wider text-primary select-none'
								>
									This site uses cookies
								</button>
							</Link>
							<button onClick={() => okButtonHandler("true")}>OK</button>
						</div>
					</Container>

					{/* Cookie Policy overlay */}
					<Container
						classes='absolute top-[--container-height-mobile] lg:top-[--header-height-desktop] left-0 max-h-[--container-height-mobile] lg:max-h-[--container-height-desktop] z-80 overflow-clip'
						isDiv={true}
						hasPadding={false}
						bgColor='transparent'
					>
						<div
							ref={overlayRef}
							className='w-full px-8 bg-primary h-[--container-height-mobile] lg:h-[--container-height-desktop] overflow-y-scroll'
						>
							<ButtonClose
								classes='absolute top-8 right-4'
								action={toggleOverlay}
							/>
							<div className='custom-rich-text'>
								<Heading
									tag='h1'
									variant='headline'
									classes='mb-16 mt-16 lg:mt-32'
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
