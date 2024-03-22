import { ArtistsPage } from "@/components/pages"

const Artists = [
	{
		name: "Instagram",
		slug: "artist1",
	},
	{
		name: "Twitter",
		slug: "artist2",
	},
	{
		name: "Facebook",
		slug: "artistjj",
	},
]

export default function Page() {
	return <ArtistsPage artists={Artists} />
}
