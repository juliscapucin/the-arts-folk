import { ContactPage } from "@/components/pages"

const SocialLinks = [
	{
		title: "Instagram",
		url: "https://www.instagram.com/",
	},
	{
		title: "Twitter",
		url: "https://www.twitter.com/",
	},
	{
		title: "Facebook",
		url: "https://www.facebook.com/",
	},
]

export default function Page() {
	return <ContactPage socialLinks={SocialLinks} />
}
