import { useRef, useCallback } from "react"

/**
 * A hook that creates a throttled function that only invokes the provided function
 * at most once per every wait milliseconds.
 *
 * @param callback - The function to throttle.
 * @param delay - The number of milliseconds to throttle invocations to.
 * @returns A new throttled function.
 */

export const useThrottle = <T extends (...args: any[]) => void>(
	callback: T,
	delay: number
): ((...args: Parameters<T>) => void) => {
	const lastCallRef = useRef<number>(0)
	const callbackRef = useRef<T>(callback)
	callbackRef.current = callback

	const throttledFn = useCallback(
		(...args: Parameters<T>) => {
			const now = Date.now()
			if (now - lastCallRef.current >= delay) {
				lastCallRef.current = now
				callbackRef.current(...args)
			}
		},
		[delay]
	)

	return throttledFn
}
