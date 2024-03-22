"use client"

import { DefaultPage } from "@/components/pages"
import { ButtonEmail } from "@/components/buttons"

import { InfoPage } from "@/types"

type InfoPageProps = {
	infoData: InfoPage
}

export default function InfoPage({ infoData }: InfoPageProps) {
	return (
		<DefaultPage hasCopyright={true} pageData={infoData}>
			{/* Email + Phone */}
			<div className='lg:w-2/5 flex flex-col justify-center items-center gap-16 my-24 lg:my-0'>
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
