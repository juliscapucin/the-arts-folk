"use client"

import { createContext, useContext, useState } from "react"

// TYPE
interface ContextProps {
	isMobileMenuOpen: boolean
	setIsMobileMenuOpen: React.Dispatch<React.SetStateAction<boolean>>
}

// CREATE CONTEXT
const MobileMenuContext = createContext<ContextProps | null>(null)

// CONTEXT PROVIDER
export const MobileMenuContextProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

	return (
		<MobileMenuContext.Provider
			value={{
				isMobileMenuOpen,
				setIsMobileMenuOpen,
			}}
		>
			{children}
		</MobileMenuContext.Provider>
	)
}

// CONTEXT CUSTOM HOOK
export const useMobileMenuContext = () => {
	const context = useContext(MobileMenuContext)
	if (!context)
		throw new Error(
			"useMobileMenuContext must be used within MobileMenuContextProvider"
		)
	return context
}
