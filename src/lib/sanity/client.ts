import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import type { SanityImageSource } from '@sanity/image-url/lib/types/types';

const options = {
  dataset: 'production',
  projectId: 'uuflswvx',
  useCdn: process.env.NODE_ENV === 'production',
  apiVersion: '2023-06-02'
};

export const client = createClient(options);

const builder = imageUrlBuilder(client);

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source);
};
