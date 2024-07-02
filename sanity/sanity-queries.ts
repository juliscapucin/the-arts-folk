import { createClient, groq } from "next-sanity"
import clientConfig from "@/sanity/config/client-config"
import type {
	Artist,
	Category,
	InfoPage,
	NavLink,
	Project,
	Page,
} from "@/types"

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
      scrapbookImages,
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
      artistInfo,
      coverImage{
         fileName,
         alt,
       },
      url,
      "category": categories[]->title,
      artistInstagram,
      agentEmail,
      projects
   }`,
		{ slug }
	)
}

export async function getCategories(): Promise<Category[]> {
	return client.fetch(
		groq`*[_type == "categories"]{
      title,
      _id
   }`
	)
}

export async function getArtistSections(): Promise<Category[]> {
	return client.fetch(
		groq`*[_type == "artistSection"]{
      title,
      _id
   }`
	)
}

export async function getProjects(): Promise<Project[]> {
	return client.fetch(
		groq`*[_type == "project"] | order(releaseDate desc){
      _id,
      "slug": slug.current,
      artist,
      artistSection,
      title,
      projectInfo,
      releaseDate,
      images,
      isNews,
      newsPageSize,
      addSpaceBefore,
      addSpaceAfter
   }`
	)
}

export async function getProjectsByArtist(
	artistId: string
): Promise<Project[]> {
	return client.fetch(
		groq`*[_type == "project" && artist._ref == $artistId] | order(releaseDate desc){
       _id,
       "slug": slug.current,
       artist,
       artistSection,
       title,
       projectInfo,
       releaseDate,
       images,
     }`,
		{ artistId }
	)
}

export async function getProject(slug: string): Promise<Project> {
	return client.fetch(
		groq`*[_type == "project" && slug.current == $slug][0]{
      _id,
      "slug": slug.current,
      title,
      artist,
      projectInfo,
      releaseDate,
      images,
      isNews
   }`,
		{ slug }
	)
}

export async function getPage(slug: string): Promise<Page> {
	return client.fetch(
		groq`*[_type == "pages" && (headerLink._ref in *[_type == "header" && slug.current == $slug]._id || slug.current == $slug)][0] {
           title,
           metadataTitle,
           metadataDescription,
           metadataKeywords,
           content,
       }`,
		{ slug }
	)
}

export async function getInfoPage(): Promise<InfoPage> {
	return client.fetch(
		groq`*[_type == "infoPage"][0] {
      title,
      metadataTitle,
      metadataDescription,
      metadataKeywords,
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
         "slug": slug.current,
         order
       }`
	)
}
