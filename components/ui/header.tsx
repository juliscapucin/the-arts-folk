import { Navbar } from "@/components/ui"
import { ButtonLogo } from "@/components/buttons"

export default function Header() {
	return (
		<header className='w-full flex justify-between items-end'>
			<ButtonLogo />
			<Navbar />
		</header>
	)
}
