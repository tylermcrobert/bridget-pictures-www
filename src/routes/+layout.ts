import type { ServerData } from './+layout.server.js';

export type Data = ServerData & { title: string | null; currentId: string };

export function load({ route, params, data }) {
  let title = 'Bridget Baker';
  if (route.id === '/info') title = 'Info - Bridget Baker';
  if (params.slug) title = `${params.slug} - Bridget Baker`;

  const currentSlug = params.slug;
  const currentRoute = route.id?.replace('/', '');
  const currentId = currentSlug || currentRoute || '/';

  return { title, currentId, ...data };
}
