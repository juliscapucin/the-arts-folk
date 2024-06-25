import { Category } from "@/types"
import { Fragment } from "react"

type CategoryFilterProps = {
	categories: Category[]
	activeCategory: string
	setActiveCategory: React.Dispatch<React.SetStateAction<string>>
}

export default function CategoryFilter({
	categories,
	activeCategory,
	setActiveCategory,
}: CategoryFilterProps) {
	return (
		<div className='absolute top-[--header-height-desktop] w-full h-16 pr-16 z-100 flex items-center justify-center gap-1 md:gap-2 font-text'>
			<button
				onClick={() => setActiveCategory("all")}
				className={`uppercase text-labelMedium md:text-labelLarge font-medium ${
					activeCategory === "all" ? "active underlined-link" : ""
				}`}
			>
				All
			</button>
			<span>/</span>

			{categories.map((category, index) => {
				return (
					<Fragment key={`${category.title}-category`}>
						<button
							onClick={() => setActiveCategory(category._id)}
							className={`underlined-link uppercase text-labelMedium md:text-labelLarge font-medium ${
								activeCategory === category._id ? "active" : ""
							}`}
						>
							{category.title}
						</button>
						{index < categories.length - 1 && <span>/</span>}
					</Fragment>
				)
			})}
		</div>
	)
}
