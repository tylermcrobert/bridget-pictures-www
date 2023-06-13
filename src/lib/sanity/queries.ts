import type { SanityImageSource } from '@sanity/image-url/lib/types/types';
import groq from 'groq';

export const CollectionQuery = groq`
  *[_type == 'collection' && slug.current == $slug][0]{
    "images": images[].image,
    title,
  }
`;

export type CollectionQuery = {
  title: string | null;
  images: SanityImageSource[];
};

/**
 * Use both Photo and Art queries so that the
 * app can decide based on where it's
 * deployed which collection to use.
 */

export const navQuery = groq`
  *[_type == 'site'][0]{
    'photoCollections': photoCollections[]-> {
      "slug": slug.current,
      title
    },
    'artCollections': artCollections[]-> {
      "slug": slug.current,
      title
    }
  }
`;

export type NavItem = {
  title: string | null;
  slug: string | null;
};

export type NavQuery = {
  photoCollections: NavItem[];
  artCollections: NavItem[];
};
