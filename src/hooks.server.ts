import MobileDetect from 'mobile-detect';

export async function handle({ event, resolve }) {
  const userAgent = event.request.headers.get('user-agent');
  const md = new MobileDetect(userAgent || '');
  const isMobile = !!md.mobile();

  event.locals.isMobile = isMobile;

  const response = await resolve(event);
  return response;
}
