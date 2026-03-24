import { error, fail } from '@sveltejs/kit';
import { getArticleById, updateArticle } from '$lib/api.js';
import type { PageServerLoad, Actions } from './$types.js';

export const load: PageServerLoad = async ({ params, fetch, cookies }) => {
  const token = cookies.get('dt')!;
  const article = await getArticleById(params.id, fetch, token);
  if (!article) error(404, 'Article not found');
  return { article };
};

export const actions: Actions = {
  save: async ({ params, request, fetch, cookies }) => {
    const token = cookies.get('dt')!;
    const data = await request.formData();
    const title = String(data.get('title') ?? '');
    const slug = String(data.get('slug') ?? '');
    const content = String(data.get('content') ?? '');
    const status = String(data.get('status') ?? 'draft') as 'draft' | 'published';

    const updated = await updateArticle(params.id, { title, slug, content, status }, fetch, token);
    if (!updated) return fail(500, { error: 'Save failed' });
    return { success: true };
  },
};
