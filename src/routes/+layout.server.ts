import { client } from '$lib/sanity/client';
import { navQuery, type NavItem, type NavQuery } from '$lib/sanity/queries';
import { PUBLIC_COLLECTION } from '$env/static/public';

/**
 * Collection
 *
 * This is used so that in a certain instance,
 * we can pull in either the art collections
 * or photo collections from the response data
 * from the site query. Env variables will used
 * in vercel.
 */

const isArt = PUBLIC_COLLECTION === 'ART';

export type ServerData = { isMobile: boolean; navRoutes: NavItem[] } & NavQuery;

export async function load(ctx): Promise<ServerData> {
  const data: NavQuery = await client.fetch(navQuery);

  /** Gets data from 'site' */
  const routes = data[isArt ? 'artCollections' : 'photoCollections'];
  /** Transform data for Navigation component */
  const navRoutes = getNavRoutes(routes);

  return { isMobile: ctx.locals.isMobile, ...data, navRoutes };
}

/**
 * takes in Nav items and adds in the "Info"
 * page as well as changes the slug from
 * 'featured' to '/'.
 */

function getNavRoutes(items: NavItem[]) {
  const infoRoute = { slug: 'info', title: 'Info' };
  items[0].slug = '/';
  return [...items, infoRoute];
}
