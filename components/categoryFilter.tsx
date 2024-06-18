import { Fragment } from "react"

type CategoryFilterProps = {
	categories: string[]
	activeCategory: string
	setActiveCategory: React.Dispatch<React.SetStateAction<string>>
}

export default function CategoryFilter({
	categories,
	activeCategory,
	setActiveCategory,
}: CategoryFilterProps) {
	return (
		<div className='absolute w-full h-16 z-100 flex items-center justify-center gap-2 font-text'>
			{categories.map((category, index) => {
				return (
					<Fragment key={`${category}-category`}>
						<button
							onClick={() => setActiveCategory(category.toLowerCase())}
							className={`uppercase text-labelLarge font-medium ${
								activeCategory.toLowerCase() === category.toLowerCase()
									? "underline"
									: ""
							} hover:text-faded-50`}
						>
							{category}
						</button>
						{index < categories.length - 1 && <span>/</span>}
					</Fragment>
				)
			})}
		</div>
	)
}
