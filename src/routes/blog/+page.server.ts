import { API_KEY } from '$env/static/private';
import { getArticles } from '$lib/api.js';
import type { PageServerLoad } from './$types.js';

export const load: PageServerLoad = async ({ fetch }) => {
  const articles = await getArticles(fetch, API_KEY);
  return { articles };
};
