import { useState, useEffect } from "react"
import { useThrottle } from "./useThrottle" // Adjust the import path as necessary

export const useWindowDimensions = () => {
	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)

	// Create a throttled version of the resize listener
	const throttledListener = useThrottle(() => {
		setWidth(window.innerWidth)
		setHeight(window.innerHeight)
	}, 100)

	useEffect(() => {
		if (typeof window !== "undefined") {
			window.addEventListener("resize", throttledListener)

			return () => {
				window.removeEventListener("resize", throttledListener)
			}
		}
	}, [throttledListener])

	return { width, height }
}
