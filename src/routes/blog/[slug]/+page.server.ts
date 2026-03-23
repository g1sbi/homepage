import { API_KEY } from '$env/static/private';
import { getArticleBySlug } from '$lib/api.js';
import { error } from '@sveltejs/kit';
import { marked } from 'marked';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const article = await getArticleBySlug(params.slug, fetch, API_KEY);
  if (!article) error(404, 'Article not found');
  const contentHtml = await marked(article.content ?? '');
  return { article, contentHtml };
};
