import { usePathname } from "next/navigation"
import { Logo } from "@/components/svgs"

type ButtonLogoProps = {
	handleClick: () => void
}

export default function ButtonLogo({ handleClick }: ButtonLogoProps) {
	const pathname = usePathname()
	const CustomTag = pathname === "/" ? "span" : "button"

	return (
		<CustomTag
			className='scale-50 lg:scale-75 origin-left z-150'
			onClick={pathname === "/" ? undefined : handleClick}
		>
			<Logo />
		</CustomTag>
	)
}
