import { createClient, groq } from "next-sanity"
import clientConfig from "./config/client-config"

const client = createClient(clientConfig)

export async function getArtists() {
	return client.fetch(
		groq`*[_type == "artist"]{
      _id,
      name,
      "slug": slug.current,
      coverImage{
         fileName,
         alt,
       },
      category,
   }`
	)
}

export async function getArtist(slug: string) {
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
      images,
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

export async function getInfoPage() {
	return client.fetch(
		groq`*[_type == "infoPage"][0] {
      title,
      "headerLink": header->slug.current,
      description,
      contactInfo
   }`
	)
}

export async function getHeaderNavLinks() {
	return client.fetch(
		groq`*[_type == "navigation" && title == "Header Links"][0] {
         items[] {
            title,
            "slug": slug.current,
            _key,
            order
          }
   }`
	)
}
