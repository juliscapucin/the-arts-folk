"use client"

import { useEffect, useState } from "react"

export function useCookieStorage() {
	const [cookie, setCookie] = useState<string | null>(null)

	const updateCookie = (cookie: string) => {
		localStorage.setItem("cookieSettings", cookie)
	}

	useEffect(() => {
		setCookie(localStorage.getItem("cookieSettings") || "false")
	}, [])

	// Update cookie in session storage on change
	useEffect(() => {
		if (!cookie) return
		updateCookie(cookie)
	}, [cookie])

	return { cookie, setCookie, updateCookie }
}
