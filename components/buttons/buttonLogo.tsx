import { useRouter } from "next/navigation"
import { Logo } from "@/components/svgs"

export default function ButtonLogo() {
	const router = useRouter()

	const handleClick = () => {
		router.push("/")
	}
	return (
		<button className='scale-50 lg:scale-75 origin-left' onClick={handleClick}>
			<Logo />
		</button>
	)
}
