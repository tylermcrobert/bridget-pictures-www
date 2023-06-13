import { client } from '$lib/sanity/client';
import { CollectionQuery } from '$lib/sanity/queries';
import { redirect } from '@sveltejs/kit';

export async function load({ params }) {
  const data = await client.fetch(CollectionQuery, { slug: params.slug });
  if (data) return data;
  throw redirect(307, '/');
}
