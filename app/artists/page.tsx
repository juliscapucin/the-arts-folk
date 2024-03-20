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
		slug: "artist3",
	},
]

export default function Page() {
	return <ArtistsPage artists={Artists} />
}
