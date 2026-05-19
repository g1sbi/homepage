import { API_KEY } from '$env/static/private';
import { incrementViews } from '$lib/api.js';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

export const POST: RequestHandler = async ({ params, fetch }) => {
  const views = await incrementViews(params.id, fetch, API_KEY);
  return json({ views });
};
