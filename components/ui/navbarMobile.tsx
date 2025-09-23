'use client'

import { usePathname, useRouter } from 'next/navigation'

import { ButtonBurger } from '@/components/buttons'

import type { NavLink } from '@/types'

type NavbarMobileProps = {
	navLinks: NavLink[]
	isMobileMenuOpen: boolean
	setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function NavbarMobile({
	navLinks,
	isMobileMenuOpen,
	setIsMobileMenuOpen,
}: NavbarMobileProps) {
	const pathname = usePathname()
	const router = useRouter()

	const transitionOnClick = (link: NavLink) => {
		link.slug && router.push(`/${link.slug}`)
		toggleMobileMenu()
	}

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen)
	}

	return (
		navLinks && (
			<div className='block lg:hidden overflow-clip'>
				<div className='absolute top-4 right-4 flex justify-end items-center z-[501]'>
					{/* Burger Button */}
					<ButtonBurger action={toggleMobileMenu} isOpen={isMobileMenuOpen} />
				</div>

				{/* Mobile Menu */}
				<aside
					className={`absolute top-0 left-0 w-screen h-vh p-8 bg-secondary transition-transform duration-300 delay-200 z-mobile-menu overflow-clip ${
						isMobileMenuOpen ? '' : '-translate-y-full'
					}`}>
					{/* Nav Links */}
					<nav className='flex flex-col gap-24 h-svh items-center justify-center'>
						<div
							className={`relative flex justify-center items-start font-text text-headline-large text-primary font-thin`}
							key={'home-link'}>
							{/* Inactive Link */}
							{pathname === '/' ? (
								<span className='uppercase opacity-50'>Home</span>
							) : (
								// Active Link
								<button
									className='block'
									onClick={() =>
										transitionOnClick({ slug: '/', title: 'Home', order: 0 })
									}>
									<span className='uppercase'>Home</span>
								</button>
							)}
						</div>
						{navLinks.map((link) => {
							return (
								<div
									className={`relative flex justify-center items-start font-text text-headline-large text-primary font-thin`}
									key={link.title}>
									{/* Inactive Link */}
									{(pathname === '/' && link.slug === '/') ||
									pathname.includes(`/${link.slug}`) ? (
										<span className='uppercase opacity-50'>{link.title}</span>
									) : (
										// Active Link
										<button
											className='block'
											onClick={() => transitionOnClick(link)}>
											<span className='uppercase'>{link.title}</span>
										</button>
									)}
								</div>
							)
						})}
					</nav>
				</aside>
			</div>
		)
	)
}
