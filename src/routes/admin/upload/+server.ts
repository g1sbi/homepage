import { json, error } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

const CMS_URL = 'https://cms.gisbi.me';

export const POST: RequestHandler = async ({ request, cookies }) => {
  const token = cookies.get('dt');
  if (!token) error(401, 'Unauthorized');

  const formData = await request.formData();

  const res = await fetch(`${CMS_URL}/files`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!res.ok) error(500, 'Upload failed');

  const { data } = await res.json();
  return json({ url: `${CMS_URL}/assets/${data.id}` });
};
