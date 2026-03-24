import { redirect } from '@sveltejs/kit';
import { getAllArticles, createArticle } from '$lib/api.js';
import type { PageServerLoad, Actions } from './$types.js';

export const load: PageServerLoad = async ({ fetch, cookies }) => {
  const token = cookies.get('dt')!;
  const articles = await getAllArticles(fetch, token);
  return { articles };
};

export const actions: Actions = {
  logout: async ({ cookies }) => {
    cookies.delete('dt', { path: '/admin' });
    cookies.delete('dtr', { path: '/admin' });
    cookies.delete('dte', { path: '/admin' });
    throw redirect(302, '/admin/login');
  },
  create: async ({ fetch, cookies }) => {
    const token = cookies.get('dt')!;
    const article = await createArticle(fetch, token);
    if (!article) return;
    throw redirect(302, `/admin/${article.id}`);
  },
};
