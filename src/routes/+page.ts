import { client } from '$lib/sanity/client';
import { CollectionQuery } from '$lib/sanity/queries';
import { PUBLIC_COLLECTION } from '$env/static/public';

const isArt = PUBLIC_COLLECTION === 'ART';

export async function load() {
  /**
   * Set the homepage default slug based on
   * wheather the app is in "ART" or "PHOTO" mode.
   */
  const slug = isArt ? 'featured-art' : 'featured';
  const data = await client.fetch(CollectionQuery, { slug });
  return data;
}
