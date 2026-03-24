import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types.js';

export const load: LayoutServerLoad = async ({ cookies, url }) => {
  const token = cookies.get('dt');
  if (!token && url.pathname !== '/admin/login') {
    throw redirect(302, '/admin/login');
  }
  return {};
};
