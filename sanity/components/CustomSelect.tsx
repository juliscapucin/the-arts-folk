import {
	FaAlignLeft,
	FaAlignCenter,
	FaAlignRight,
	FaAlignJustify,
} from "react-icons/fa"

import type { JSX } from "react";

const iconMap: { [key: string]: JSX.Element } = {
	FaAlignLeft: <FaAlignLeft />,
	FaAlignCenter: <FaAlignCenter />,
	FaAlignRight: <FaAlignRight />,
	FaAlignJustify: <FaAlignJustify />,
}

type CustomSelectOptionProps = {
	title: string
	value: string
	icon: string
}

const CustomSelectOption = ({
	title,
	value,
	icon,
}: CustomSelectOptionProps) => {
	return (
		<div className='flex items-center'>
			<span className='mr-2'>{iconMap[icon]}</span>
			<span>{title}</span>
		</div>
	)
}

export default CustomSelectOption
