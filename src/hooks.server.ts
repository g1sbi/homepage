import { redirect } from '@sveltejs/kit';
import type { Handle } from '@sveltejs/kit';

const CMS_URL = 'https://cms.gisbi.me';
const COOKIE_OPTS = { httpOnly: true, path: '/admin', sameSite: 'strict' as const, maxAge: 60 * 60 * 24 * 7 };

export const handle: Handle = async ({ event, resolve }) => {
  const path = event.url.pathname;

  if (path.startsWith('/admin') && path !== '/admin/login') {
    const token = event.cookies.get('dt');
    const refreshToken = event.cookies.get('dtr');
    const expiry = Number(event.cookies.get('dte') ?? 0);

    if (!token && !refreshToken) {
      throw redirect(302, '/admin/login');
    }

    // Refresh if expired or expiring within 60 seconds
    if (!token || Date.now() > expiry - 60_000) {
      if (!refreshToken) {
        event.cookies.delete('dt', { path: '/admin' });
        throw redirect(302, '/admin/login');
      }

      const res = await fetch(`${CMS_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh_token: refreshToken, mode: 'json' }),
      });

      if (!res.ok) {
        event.cookies.delete('dt', { path: '/admin' });
        event.cookies.delete('dtr', { path: '/admin' });
        event.cookies.delete('dte', { path: '/admin' });
        throw redirect(302, '/admin/login');
      }

      const { data: auth } = await res.json();
      event.cookies.set('dt', auth.access_token, COOKIE_OPTS);
      event.cookies.set('dtr', auth.refresh_token, COOKIE_OPTS);
      event.cookies.set('dte', String(Date.now() + auth.expires), COOKIE_OPTS);
    }
  }

  return resolve(event);
};
