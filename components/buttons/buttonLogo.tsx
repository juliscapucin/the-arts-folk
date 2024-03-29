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
				<button
					className='scale-50 lg:scale-75 origin-left min-w-[50%] z-80'
					onClick={pathname === "/" ? undefined : handleClick}
				>
					{pathname !== "/" && <Logo />}
				</button>
			)}
		</>
	)
}
