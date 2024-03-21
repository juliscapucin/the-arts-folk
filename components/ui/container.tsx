import React from "react"

export default function Container({ children }: { children: React.ReactNode }) {
	return (
		<main className='px-[--padding-desktop] mx-[--padding-desktop] bg-primary'>
			{children}
		</main>
	)
}
