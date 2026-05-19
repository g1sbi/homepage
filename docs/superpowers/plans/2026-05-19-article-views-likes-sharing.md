# Article Views, Likes, and Sharing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add view counts, a like toggle, a share button, and Open Graph meta tags to blog articles, with counts stored in Directus CMS and de-duplication via localStorage.

**Architecture:** Two new SvelteKit server endpoints (`POST /api/articles/[id]/view` and `POST /api/articles/[id]/like`) proxy increment operations to Directus using the server-only API key. The client checks localStorage before firing requests, and updates counts optimistically. OG meta tags are rendered server-side in `<svelte:head>`.

**Tech Stack:** SvelteKit 2, Svelte 5, TypeScript, Directus CMS REST API, Tailwind CSS, Bun

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Modify | `src/lib/api.ts` | Add `views`/`likes` to `Article` type; add `incrementViews` and `incrementLikes` helpers |
| Modify | `src/lib/utils.ts` | Extract shared `excerpt` and `formatDate` utilities (new file) |
| Create | `src/routes/api/articles/[id]/view/+server.ts` | POST endpoint — increment views in Directus |
| Create | `src/routes/api/articles/[id]/like/+server.ts` | POST endpoint — increment/decrement likes in Directus |
| Modify | `src/routes/blog/[slug]/+page.svelte` | OG tags, views/likes display, like button, share button, localStorage logic |
| Modify | `src/routes/blog/+page.svelte` | Views/likes counts on article list rows |

---

## Pre-requisite: Add Directus fields (manual — do this before any code)

In the Directus admin at `https://cms.gisbi.me/admin`:

1. Go to **Settings → Data Model → articles**
2. Add field: name `views`, type `Integer`, default value `0`
3. Add field: name `likes`, type `Integer`, default value `0`
4. Save

These fields are returned automatically by existing queries that use `fields: '*'`.

---

## Task 1: Extract shared utilities to `src/lib/utils.ts`

**Files:**
- Create: `src/lib/utils.ts`
- Modify: `src/routes/blog/+page.svelte` (import from utils instead of local functions)

- [ ] **Step 1: Create `src/lib/utils.ts`**

```typescript
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toISOString().slice(0, 10);
}

export function excerpt(content: string, maxLen = 120): string {
  const plain = content
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
    .replace(/#{1,6}\s*/g, '')
    .replace(/[*_`~>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length > maxLen ? plain.slice(0, maxLen).trimEnd() + '…' : plain;
}
```

- [ ] **Step 2: Update `src/routes/blog/+page.svelte` — replace local functions with imports**

In the `<script>` block, remove the `formatDate` and `excerpt` function definitions and add the import:

```typescript
import { formatDate, excerpt } from '$lib/utils.js';
```

Remove these lines from the script block:
```typescript
function formatDate(dateStr: string): string {
  return new Date(dateStr).toISOString().slice(0, 10);
}

function excerpt(content: string, maxLen = 120): string {
  const plain = content
    .replace(/!\[.*?\]\(.*?\)/g, '')
    .replace(/\[([^\]]+)\]\(.*?\)/g, '$1')
    .replace(/#{1,6}\s*/g, '')
    .replace(/[*_`~>]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return plain.length > maxLen ? plain.slice(0, maxLen).trimEnd() + '…' : plain;
}
```

- [ ] **Step 3: Type-check**

```bash
bunx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add src/lib/utils.ts src/routes/blog/+page.svelte
git commit -m "refactor: extract formatDate and excerpt to shared utils"
```

---

## Task 2: Update `Article` type and add API helpers

**Files:**
- Modify: `src/lib/api.ts`

- [ ] **Step 1: Add `views` and `likes` to the `Article` interface**

In `src/lib/api.ts`, update the `Article` interface by adding two fields after `date_updated`:

```typescript
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
  views: number;
  likes: number;
}
```

- [ ] **Step 2: Add `incrementViews` helper at the bottom of `src/lib/api.ts`**

```typescript
export async function incrementViews(
  id: string,
  fetch: typeof globalThis.fetch,
  token: string
): Promise<number> {
  const res = await fetch(`${CMS_URL}/items/articles/${id}?fields=views`, {
    headers: authHeaders(token),
  });
  if (!res.ok) return 0;
  const { data } = await res.json();
  const current: number = data?.views ?? 0;
  const patchRes = await fetch(`${CMS_URL}/items/articles/${id}`, {
    method: 'PATCH',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ views: current + 1 }),
  });
  if (!patchRes.ok) return current;
  const { data: updated } = await patchRes.json();
  return updated?.views ?? current + 1;
}
```

- [ ] **Step 3: Add `incrementLikes` helper at the bottom of `src/lib/api.ts`**

```typescript
export async function incrementLikes(
  id: string,
  delta: 1 | -1,
  fetch: typeof globalThis.fetch,
  token: string
): Promise<number> {
  const res = await fetch(`${CMS_URL}/items/articles/${id}?fields=likes`, {
    headers: authHeaders(token),
  });
  if (!res.ok) return 0;
  const { data } = await res.json();
  const current: number = data?.likes ?? 0;
  const next = Math.max(0, current + delta);
  const patchRes = await fetch(`${CMS_URL}/items/articles/${id}`, {
    method: 'PATCH',
    headers: { ...authHeaders(token), 'Content-Type': 'application/json' },
    body: JSON.stringify({ likes: next }),
  });
  if (!patchRes.ok) return current;
  const { data: updated } = await patchRes.json();
  return updated?.likes ?? next;
}
```

- [ ] **Step 4: Type-check**

```bash
bunx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add src/lib/api.ts
git commit -m "feat: add views/likes fields to Article type and increment helpers"
```

---

## Task 3: Create view API endpoint

**Files:**
- Create: `src/routes/api/articles/[id]/view/+server.ts`

- [ ] **Step 1: Create the directory and file**

Create `src/routes/api/articles/[id]/view/+server.ts` with this content:

```typescript
import { API_KEY } from '$env/static/private';
import { incrementViews } from '$lib/api.js';
import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types.js';

export const POST: RequestHandler = async ({ params, fetch }) => {
  const views = await incrementViews(params.id, fetch, API_KEY);
  return json({ views });
};
```

- [ ] **Step 2: Type-check**

```bash
bunx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Manual smoke test**

Start the dev server (`bun run dev`), then in a terminal:

```bash
curl -X POST http://localhost:5173/api/articles/<any-article-id>view
```

Expected: `{"views": <some number>}` — or a 500 if Directus fields aren't added yet (that's fine, the endpoint is wired up).

- [ ] **Step 4: Commit**

```bash
git add "src/routes/api/articles/[id]/view/+server.ts"
git commit -m "feat: add POST /api/articles/[id]/view endpoint"
```

---

## Task 4: Create like API endpoint

**Files:**
- Create: `src/routes/api/articles/[id]/like/+server.ts`

- [ ] **Step 1: Create `src/routes/api/articles/[id]/like/+server.ts`**

```typescript
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
```

- [ ] **Step 2: Type-check**

```bash
bunx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add "src/routes/api/articles/[id]/like/+server.ts"
git commit -m "feat: add POST /api/articles/[id]/like endpoint"
```

---

## Task 5: Update article detail page

**Files:**
- Modify: `src/routes/blog/[slug]/+page.svelte`

This task adds OG meta tags, a views/likes display row, a like toggle button, and a share button. It also adds the localStorage logic to track views and likes.

- [ ] **Step 1: Replace the entire `<script>` block**

Replace the existing script block in `src/routes/blog/[slug]/+page.svelte` with:

```svelte
<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { runCommand } from '$lib/tui/commands/index.js';
  import CommandLine from '$lib/components/tui/CommandLine.svelte';
  import { assetUrl } from '$lib/api.js';
  import { excerpt } from '$lib/utils.js';
  import type { PageData } from './$types.js';

  export let data: PageData;

  const { article, contentHtml } = data;

  let input = '';
  let inputEl: HTMLInputElement | undefined = undefined;

  let views = article.views ?? 0;
  let likes = article.likes ?? 0;
  let liked = false;
  let shareStatus = '';

  function handleSubmit() {
    const line = input.trim();
    if (!line) return;
    const [cmd, ...args] = line.split(/\s+/);
    const result = runCommand(cmd, args);
    if (result.type === 'navigate') {
      goto(result.path);
      return;
    }
    input = '';
  }

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toISOString().slice(0, 10);
  }

  onMount(async () => {
    inputEl?.focus();

    // Track view — only once per browser
    const viewedKey = 'viewed_articles';
    const viewed: string[] = JSON.parse(localStorage.getItem(viewedKey) ?? '[]');
    if (!viewed.includes(article.id)) {
      try {
        const res = await fetch(`/api/articles/${article.id}/view`, { method: 'POST' });
        if (res.ok) {
          const result = await res.json();
          views = result.views;
        }
      } catch {}
      localStorage.setItem(viewedKey, JSON.stringify([...viewed, article.id]));
    }

    // Restore liked state from localStorage
    const likedKey = 'liked_articles';
    const likedList: string[] = JSON.parse(localStorage.getItem(likedKey) ?? '[]');
    liked = likedList.includes(article.id);
  });

  async function toggleLike() {
    const likedKey = 'liked_articles';
    const likedList: string[] = JSON.parse(localStorage.getItem(likedKey) ?? '[]');
    const delta: 1 | -1 = liked ? -1 : 1;

    // Optimistic update
    liked = !liked;
    likes = Math.max(0, likes + delta);

    if (liked) {
      localStorage.setItem(likedKey, JSON.stringify([...likedList, article.id]));
    } else {
      localStorage.setItem(likedKey, JSON.stringify(likedList.filter((id) => id !== article.id)));
    }

    try {
      const res = await fetch(`/api/articles/${article.id}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ delta }),
      });
      if (res.ok) {
        const result = await res.json();
        likes = result.likes;
      }
    } catch {}
  }

  async function handleShare() {
    const url = window.location.href;
    const text = excerpt(article.content ?? '', 160);

    if (navigator.share) {
      try {
        await navigator.share({ title: article.title, url, text });
      } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(url);
        shareStatus = 'copied!';
        setTimeout(() => (shareStatus = ''), 2000);
      } catch {}
    }
  }
</script>
```

- [ ] **Step 2: Replace `<svelte:head>` with OG tags**

Replace the existing `<svelte:head>` block:

```svelte
<svelte:head>
  <title>{article.title}</title>
  <meta property="og:title" content={article.title} />
  <meta property="og:description" content={excerpt(article.content ?? '', 160)} />
  <meta property="og:type" content="article" />
  {#if article.cover_photo}
    <meta property="og:image" content={assetUrl(article.cover_photo.id, { width: '1200', format: 'webp' })} />
    <meta name="twitter:card" content="summary_large_image" />
  {:else}
    <meta name="twitter:card" content="summary" />
  {/if}
</svelte:head>
```

- [ ] **Step 3: Add views/likes/share row to the article header**

After the date line (`<p class="mb-6 text-primary-700 text-xs">{formatDate(article.date_created)}</p>`), add:

```svelte
<div class="mb-6 flex items-center gap-4 text-xs text-primary-700">
  <span>◉ {views}</span>
  <button
    on:click={toggleLike}
    class="transition-colors hover:text-primary-400 {liked ? 'text-primary-400' : ''}"
    aria-label="like"
  >
    ♥ {likes}
  </button>
  <button
    on:click={handleShare}
    class="transition-colors hover:text-primary-400"
    aria-label="share"
  >
    {shareStatus || '[share]'}
  </button>
</div>
```

- [ ] **Step 4: Type-check**

```bash
bunx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Manual test in browser**

Start dev server (`bun run dev`), open an article page. Verify:
- View count increments on first visit, stays the same on refresh
- Like button toggles color and count, persists across refresh
- Share button triggers native share sheet on mobile / shows "copied!" on desktop
- Check page source or DevTools Elements for OG meta tags

- [ ] **Step 6: Commit**

```bash
git add src/routes/blog/[slug]/+page.svelte
git commit -m "feat: add views, likes, share button, and OG tags to article detail page"
```

---

## Task 6: Add views/likes to blog list

**Files:**
- Modify: `src/routes/blog/+page.svelte`

- [ ] **Step 1: Add import for `formatDate` from utils (already done if Task 1 is complete)**

The import `import { formatDate, excerpt } from '$lib/utils.js';` should already be in place from Task 1.

- [ ] **Step 2: Update each article row in the template**

Find this block inside the `{#each data.articles as article}` loop:

```svelte
<div class="flex items-baseline justify-between gap-4">
  <span class="group-hover:underline underline-offset-2">{article.title}</span>
  <span class="shrink-0 text-primary-700">{formatDate(article.date_created)}</span>
</div>
```

Replace it with:

```svelte
<div class="flex items-baseline justify-between gap-4">
  <span class="group-hover:underline underline-offset-2">{article.title}</span>
  <div class="flex items-baseline gap-3 shrink-0 text-primary-700">
    <span>{formatDate(article.date_created)}</span>
    <span>◉ {article.views ?? 0}</span>
    <span>♥ {article.likes ?? 0}</span>
  </div>
</div>
```

- [ ] **Step 3: Type-check**

```bash
bunx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Manual test in browser**

Open `/blog`. Verify view and like counts appear dimmed on the right side of each article row.

- [ ] **Step 5: Commit**

```bash
git add src/routes/blog/+page.svelte
git commit -m "feat: show view and like counts on blog list"
```

---

## Done

All features are implemented. Final check:

- [ ] Directus `views` and `likes` fields exist (pre-requisite)
- [ ] `POST /api/articles/[id]/view` increments views and de-dupes via localStorage
- [ ] `POST /api/articles/[id]/like` toggles likes and de-dupes via localStorage
- [ ] Article detail shows ◉ views, ♥ likes (toggleable), `[share]` button
- [ ] Blog list shows ◉ views and ♥ likes per row
- [ ] OG tags include `og:image` from cover photo for rich link previews
