import { News } from "@/types"

type NewsProps = {
	news: News[]
}

export default function NewsPage(news: NewsProps) {
	console.log(news)
	return <div>News</div>
}
