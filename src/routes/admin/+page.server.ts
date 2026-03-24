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
  delete: async ({ request, fetch, cookies }) => {
    const token = cookies.get('dt')!;
    const data = await request.formData();
    const id = String(data.get('id') ?? '');
    await fetch(`https://cms.gisbi.me/items/articles/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  create: async ({ fetch, cookies }) => {
    const token = cookies.get('dt')!;
    const article = await createArticle(fetch, token);
    if (!article) return;
    throw redirect(302, `/admin/${article.id}`);
  },
};
