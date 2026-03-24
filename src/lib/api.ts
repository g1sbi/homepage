const CMS_URL = 'https://cms.gisbi.me';

export interface DirectusFile {
  id: string;
  title: string | null;
  type: string;
  width: number | null;
  height: number | null;
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  content: string;
  status: 'draft' | 'published';
  cover_photo: DirectusFile | null;
  gallery: { directus_files_id: DirectusFile }[];
  date_created: string;
  date_updated: string;
}

export function assetUrl(fileId: string, params?: Record<string, string>): string {
  const url = new URL(`${CMS_URL}/assets/${fileId}`);
  if (params) {
    for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v);
  }
  return url.toString();
}

function authHeaders(token: string): Record<string, string> {
  return { Authorization: `Bearer ${token}` };
}

export async function getArticles(fetch: typeof globalThis.fetch, token: string): Promise<Article[]> {
  const params = new URLSearchParams({
    fields: '*,cover_photo.*,gallery.directus_files_id.*',
    'filter[status][_eq]': 'published',
    sort: '-date_created',
  });
  const res = await fetch(`${CMS_URL}/items/articles?${params}`, { headers: authHeaders(token) });
  if (!res.ok) {
    console.error(`CMS fetch failed: ${res.status}`, await res.text());
    return [];
  }
  const { data } = await res.json();
  return data ?? [];
}

export async function getArticleBySlug(slug: string, fetch: typeof globalThis.fetch, token: string): Promise<Article | null> {
  const params = new URLSearchParams({
    fields: '*,cover_photo.*,gallery.directus_files_id.*',
    'filter[slug][_eq]': slug,
    'filter[status][_eq]': 'published',
  });
  const res = await fetch(`${CMS_URL}/items/articles?${params}`, { headers: authHeaders(token) });
  if (!res.ok) {
    console.error(`CMS fetch failed: ${res.status}`, await res.text());
    return null;
  }
  const { data } = await res.json();
  return data?.[0] ?? null;
}

export async function getAllArticles(fetch: typeof globalThis.fetch, token: string): Promise<Article[]> {
  const params = new URLSearchParams({
    fields: 'id,title,slug,status,date_updated',
    sort: '-date_updated',
  });
  const res = await fetch(`${CMS_URL}/items/articles?${params}`, { headers: authHeaders(token) });
  if (!res.ok) return [];
  const { data } = await res.json();
  return data ?? [];
}

export async function getArticleById(id: string, fetch: typeof globalThis.fetch, token: string): Promise<Article | null> {
  const params = new URLSearchParams({ fields: '*' });
  const res = await fetch(`${CMS_URL}/items/articles/${id}?${params}`, { headers: authHeaders(token) });
  if (!res.ok) return null;
  const { data } = await res.json();
  return data ?? null;
}

export async function createArticle(fetch: typeof globalThis.fetch, token: string): Promise<Article | null> {
  const res = await fetch(`${CMS_URL}/items/articles`, {
    method: 'POST',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ title: 'New article', slug: `article-${Date.now()}`, content: '', status: 'draft' }),
  });
  if (!res.ok) return null;
  const { data } = await res.json();
  return data ?? null;
}

export async function updateArticle(
  id: string,
  patch: Partial<Pick<Article, 'title' | 'slug' | 'content' | 'status'>>,
  fetch: typeof globalThis.fetch,
  token: string
): Promise<Article | null> {
  const res = await fetch(`${CMS_URL}/items/articles/${id}`, {
    method: 'PATCH',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify(patch),
  });
  if (!res.ok) return null;
  const { data } = await res.json();
  return data ?? null;
}
