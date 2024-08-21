import Link from "next/link"
import { usePathname } from "next/navigation"

import { Logo } from "@/components/svgs"

type ButtonLogoProps = {
	handleClick: () => void
}

export default function ButtonLogo({ handleClick }: ButtonLogoProps) {
	const pathname = usePathname()

	return (
		<>
			{/* Don't show the logo button if the pathname is the root path */}
			{pathname === "/" ? (
				<div className='min-w-[50%]'></div>
			) : (
				<Link href='/' passHref legacyBehavior>
					<button
						className='scale-50 lg:scale-[60%] origin-left min-w-[50%] z-80'
						onClick={(e) => {
							e.preventDefault()
							pathname === "/" ? undefined : handleClick()
						}}
						aria-label='Home'
					>
						{pathname !== "/" && <Logo />}
					</button>
				</Link>
			)}
		</>
	)
}
