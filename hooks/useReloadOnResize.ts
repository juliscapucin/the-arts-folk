import { useEffect, useRef } from "react"

export default function useReloadOnResize() {
	const resizeTimeout = useRef<NodeJS.Timeout | null>(null)

	useEffect(() => {
		function handleResize() {
			resizeTimeout.current && clearTimeout(resizeTimeout.current) // Clear previous timeout

			if (window.innerWidth < 768) return
			resizeTimeout.current = setTimeout(() => {
				window.location.reload()
			}, 500)
		}

		window.addEventListener("resize", handleResize)

		return () => {
			window.removeEventListener("resize", handleResize)
		}
	}, [resizeTimeout])
}
