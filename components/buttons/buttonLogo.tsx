import { useRouter } from "next/navigation"
import { Logo } from "@/components/svgs"

export default function ButtonLogo() {
	const router = useRouter()

	const handleClick = () => {
		router.push("/")
	}
	return (
		<button className='' onClick={handleClick}>
			<Logo />
		</button>
	)
}
