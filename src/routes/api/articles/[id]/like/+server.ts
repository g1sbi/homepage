import { API_KEY } from '$env/static/private';
import { incrementLikes } from '$lib/api.js';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

export const POST: RequestHandler = async ({ params, request, fetch }) => {
  const body = await request.json().catch(() => ({}));
  const delta: 1 | -1 = body.delta === -1 ? -1 : 1;
  const likes = await incrementLikes(params.id, delta, fetch, API_KEY);
  return json({ likes });
};
