import { useState, useEffect, useCallback } from "react"
import { useThrottle } from "./useThrottle"

export const useWindowDimensions = () => {
	const [width, setWidth] = useState(0)
	const [height, setHeight] = useState(0)

	// Create a throttled version of the resize listener
	const throttledListener = useThrottle(() => {
		setWidth(window.innerWidth)
		setHeight(window.innerHeight)
	}, 100)

	const handleResize = useCallback(() => {
		throttledListener()
	}, [throttledListener])

	useEffect(() => {
		if (typeof window !== "undefined") {
			// Set initial dimensions
			setWidth(window.innerWidth)
			setHeight(window.innerHeight)

			window.addEventListener("resize", handleResize)

			return () => {
				window.removeEventListener("resize", handleResize)
			}
		}
	}, [handleResize])

	return { width, height }
}
