'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import ScrollTrigger from 'gsap/ScrollTrigger'

import { usePageContext } from '@/context'

import { ButtonLogo } from '@/components/buttons'
import { NavbarLink } from '@/components/ui'

import type { NavLink } from '@/types'

type NavbarDesktopProps = {
	navLinks: NavLink[]
}

export default function NavbarDesktop({ navLinks }: NavbarDesktopProps) {
	const pathname = usePathname()
	const { handleTransitionOnClick } = usePageContext()
	const [isScrolled, setIsScrolled] = useState(false)

	useGSAP(() => {
		if (typeof window === 'undefined') return
		gsap.registerPlugin(ScrollTrigger)

		ScrollTrigger.create({
			trigger: 'body',
			start: () => 'top top-=' + window.innerHeight,
			end: 'bottom bottom',
			onEnter: () => {
				setIsScrolled(true)
			},
			onLeaveBack: () => {
				setIsScrolled(false)
			},
		})
	}, [])

	return (
		<div className='w-full h-full max-w-desktop mx-auto px-[var(--margin-mobile)] lg:px-[var(--margin-desktop)] flex justify-between items-end'>
			<ButtonLogo
				handleClick={() =>
					handleTransitionOnClick({ slug: '/', title: 'Home', order: 1 })
				}
			/>
			{navLinks && (
				<div className='hidden lg:flex z-150'>
					{/* Menu links */}
					<nav className='w-full h-full hidden lg:flex justify-end items-center gap-16 lg:gap-24 mb-3'>
						{navLinks.map((link) => {
							return (
								link.slug && (
									<NavbarLink
										key={link.slug}
										link={link}
										isActive={
											pathname === `/${link.slug}` ||
											(pathname === '/' && link.slug === 'news' && isScrolled)
												? true
												: false
										}
										transitionOnClick={handleTransitionOnClick}
									/>
								)
							)
						})}
					</nav>
				</div>
			)}
		</div>
	)
}
