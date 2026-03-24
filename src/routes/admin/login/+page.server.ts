import { fail, redirect } from '@sveltejs/kit';
import type { Actions } from './$types.js';

const CMS_URL = 'https://cms.gisbi.me';

export const actions: Actions = {
  default: async ({ request, cookies }) => {
    const data = await request.formData();
    const email = String(data.get('email') ?? '');
    const password = String(data.get('password') ?? '');

    const res = await fetch(`${CMS_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) return fail(401, { error: 'Invalid credentials' });

    const { data: auth } = await res.json();
    cookies.set('dt', auth.access_token, {
      httpOnly: true,
      path: '/admin',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    });

    throw redirect(302, '/admin');
  },
};
