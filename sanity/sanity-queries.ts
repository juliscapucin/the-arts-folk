import { createClient, groq } from "next-sanity"
import clientConfig from "@/sanity/config/client-config"
import type {
	Artist,
	Category,
	InfoPage,
	NavLink,
	Project,
	Page,
	ArtistSection,
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
      projects,
      startView
   }`,
		{ slug }
	)
}

export async function getCategories(): Promise<Category[]> {
	return client.fetch(
		groq`*[_type == "categories"] | order(order asc){
      title,
      order,
      _id
   }`
	)
}

export async function getArtistSections(): Promise<ArtistSection[]> {
	return client.fetch(
		groq`*[_type == "artistSection"] | order(order asc) {
      title,
      order,
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
      images[]{
        public_id,
        url,
        asset->{_ref},
      },
      isNews,
      newsPageSize,
      addSpaceBefore,
      addSpaceAfter
   }`
	)
}

export async function getNews(): Promise<Project[]> {
	return client.fetch(
		groq`*[_type == "project" && isNews == true] | order(releaseDate desc){
      _id,
      "slug": slug.current,
      artist,
      artistSection,
      title,
      projectInfo,
      releaseDate,
      images[]{
        public_id,
        url,
        asset->{_ref},
      },
      isNews,
      newsPageSize,
      addSpaceBefore,
      addSpaceAfter
   }`
	)
}

export async function getProjectsGallery(slug: string): Promise<Project[]> {
	try {
		// Step 1: Get Page ID
		const page = await client.fetch(
			groq`*[_type == "pages" && slug.current == $slug][0]{ _id }`,
			{ slug }
		)

		if (!page?._id) {
			console.error("Page not found for the provided slug.")
			return []
		}

		// Step 2: Get Projects Linked to the Page
		return client.fetch(
			groq`*[_type == "project" && $pageId in addToPage[]._ref] | order(releaseDate desc){
         _id,
         "slug": slug.current,
         artist,
         artistSection,
         title,
         projectInfo,
         releaseDate,
         images[]{
            public_id,
            url,
            asset->{_ref},
         },
         addToPage,
         projectsGallerySize,
         addSpaceBeforeGallery,
         addSpaceAfterGallery
       }`,
			{ pageId: page._id }
		)
	} catch (error) {
		console.error("Error fetching projects:", error)
		return []
	}
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
       images[]{
        public_id,
        url,
        asset->{_ref},
      },
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
      images[]{
        public_id,
        url,
        asset->{_ref},
      },
      isNews
   }`,
		{ slug }
	)
}

export async function getPage(slug: string): Promise<Page> {
	return client.fetch(
		groq`*[_type == "pages" && (headerLink._ref in *[_type == "header" && slug.current == $slug]._id || slug.current == $slug)][0] {
           title,
           showTitle,
           metadataTitle,
           metadataDescription,
           metadataKeywords,
           content,
           addProjectsGallery
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
