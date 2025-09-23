import 'server-only';

import { draftMode } from 'next/headers';
import type { QueryParams } from 'next-sanity';

import { client } from './sanity.client';
import { sanityLiveFetch } from './sanity.live';

export async function sanityFetch<QueryResponse>({
    query,
    params = {},
    tags,
}: {
    query: string;
    params?: QueryParams;
    tags?: string[];
}) {
    const isDraftMode = (await draftMode()).isEnabled;
    if (isDraftMode) {
        const { data } = await sanityLiveFetch({
            query,
            params,
            tags,
        });
        return data;
    }

    return client.fetch<QueryResponse>(query, params, {
        next: {
            revalidate: false,
            tags,
        },
    });
}
