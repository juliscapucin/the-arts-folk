'use client'

import Link from 'next/link'

import { DefaultPage } from '@/components/pages'
import { ButtonEmail } from '@/components/buttons'

import type { InfoPage } from '@/types'

type InfoPageProps = {
	infoData: InfoPage
}

export default function InfoPage({ infoData }: InfoPageProps) {
	return (
		<DefaultPage hasCopyright={true} pageData={infoData} isCentered={true}>
			{/* Email + Phone */}
			<div className='lg:w-2/5 flex flex-col justify-center items-center gap-16 my-16 lg:my-0 h-full w-full whitespace-nowrap'>
				{infoData.contactInfo.map((contact) => (
					<ButtonEmail
						key={contact.name}
						name={contact.name}
						email={contact.email}
						phone={contact.phone}
					/>
				))}
			</div>
		</DefaultPage>
	)
}
