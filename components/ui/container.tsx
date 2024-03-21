import React from "react"

export default function Container({ children }: { children: React.ReactNode }) {
	return (
		<main className='h-[--container-height-mobile] lg:h-[--container-height-desktop] lg:px-[--padding-desktop] mx-[--padding-mobile] lg:mx-[--padding-desktop] bg-primary'>
			{children}
		</main>
	)
}
