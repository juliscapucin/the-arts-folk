import { createClient, groq } from "next-sanity"
import clientConfig from "@/sanity/config/client-config"
import type { Artist, InfoPage, NavLink, Page } from "@/types"

const client = createClient(clientConfig)

export async function getShowreel(): Promise<any> {
	return client.fetch(groq`*[title == "Showreel Home"][0].images`)
}

export async function getArtists(): Promise<Artist[]> {
	return client.fetch(
		groq`*[_type == "artist"] | order(name asc){
      _id,
      name,
      "slug": slug.current,
      description,
      images,
      category,
      artistWebsite
   }`
	)
}

export async function getArtist(slug: string): Promise<Artist> {
	return client.fetch(
		groq`*[_type == "artist" && slug.current == $slug][0]{
      _id,
      name,
      "slug": slug.current,
      description,
      coverImage{
         fileName,
         alt,
       },
      url,
      "category": categories[]->title,
      "copy1": copy1[]{
         children[0]{
           text,
           _key
         }
       },
       "copy2": copy2[]{
         children[0]{
           text,
           _key
         }
       },
   }`,
		{ slug }
	)
}

export async function getPage(slug: string): Promise<Page> {
	return client.fetch(
		groq`*[_type == "page" && headerLink._ref in *[_type == "header" && slug.current == $slug]._id][0] {
      title,
      content,
   }`,
		{ slug }
	)
}

export async function getInfoPage(): Promise<InfoPage> {
	return client.fetch(
		groq`*[_type == "infoPage"][0] {
      title,
      "headerLink": header->slug.current,
      content,
      contactInfo[]{
         name,
         email,
         phone
      },
   }`
	)
}

export async function getHeaderNavLinks(): Promise<NavLink[]> {
	return client.fetch(
		groq`*[_type == "header"]|order(order) {
         title,
         "slug": slug.current,
         order
       }`
	)
}

export async function getFooterNavLinks(): Promise<NavLink[]> {
	return client.fetch(
		groq`*[_type == "footer"]|order(order) {
         title,
         url,
         order
       }`
	)
}
