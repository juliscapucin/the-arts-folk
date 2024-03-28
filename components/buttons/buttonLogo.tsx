import { usePathname } from "next/navigation"

import { Logo } from "@/components/svgs"

type ButtonLogoProps = {
	handleClick: () => void
}

export default function ButtonLogo({ handleClick }: ButtonLogoProps) {
	const pathname = usePathname()

	return (
		<button
			className='scale-50 lg:scale-75 origin-left z-80'
			onClick={pathname === "/" ? undefined : handleClick}
		>
			<Logo />
		</button>
	)
}
