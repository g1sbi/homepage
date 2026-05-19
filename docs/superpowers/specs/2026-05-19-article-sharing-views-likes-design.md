# Article Views, Likes, and Sharing — Design Spec

**Date:** 2026-05-19  
**Status:** Approved

## Overview

Add view counts, a like system, and a share button to blog articles. View counts and likes are stored as integer fields in the Directus CMS. LocalStorage prevents double-counting from the same browser. The share button uses the Web Share API with a clipboard fallback. Article pages gain proper Open Graph meta tags so shared links render a rich preview with the cover photo.

---

## 1. Directus Schema Changes

Add two integer fields (default `0`) to the `articles` collection in Directus admin:

| Field   | Type    | Default |
|---------|---------|---------|
| `views` | integer | 0       |
| `likes` | integer | 0       |

No query changes are needed — existing queries use `fields: '*'` variants and will return these fields automatically once they exist in the schema.

---

## 2. API Layer (`src/lib/api.ts`)

Update the `Article` interface:

```ts
views: number;
likes: number;
```

Add two helper functions:

- `incrementViews(id, fetch, token)` — fetches current `views`, PATCHes `views + 1`, returns updated article
- `incrementLikes(id, delta: 1 | -1, fetch, token)` — fetches current `likes`, PATCHes `likes + delta` clamped at `0`, returns updated article

---

## 3. SvelteKit API Routes

Two new server-only endpoints:

### `POST /api/articles/[id]/view`
- Calls `incrementViews`
- Returns `{ views: number }`

### `POST /api/articles/[id]/like`
- Accepts body `{ delta: 1 | -1 }`
- Calls `incrementLikes`
- Returns `{ likes: number }`

Both use `API_KEY` from `$env/static/private`. No user auth required — localStorage is the abuse guard, which is sufficient for a personal blog.

---

## 4. Client-Side Behavior

### LocalStorage keys
- `viewed_articles` — JSON array of article IDs the user has viewed
- `liked_articles` — JSON array of article IDs the user has liked

### Views
On article page mount:
1. Read `viewed_articles` from localStorage
2. If current article ID is absent: POST to `/api/articles/[id]/view`, add ID to array, update displayed count

### Likes
Like button on article detail page toggles:
- Not liked → POST `{ delta: 1 }`, add ID to `liked_articles`, increment count
- Already liked → POST `{ delta: -1 }`, remove ID from `liked_articles`, decrement count

Both views and likes update optimistically in the UI.

---

## 5. UI

### Article detail page (`/blog/[slug]`)
Below the title and date, inline row:
- Eye icon + view count
- Heart icon + like count (clicking toggles like)
- Share button — calls `navigator.share({ title, url, text })` where `text` is a plain-text excerpt. Falls back to `navigator.clipboard.writeText(url)` with brief "copied!" feedback on unsupported browsers.

### Blog list page (`/blog`)
Each article row gains a small dimmed right-aligned cluster:
- Eye icon + view count
- Heart icon + like count

---

## 6. Open Graph Meta Tags

Added to `<svelte:head>` on the article detail page:

| Tag | Value |
|-----|-------|
| `og:title` | Article title |
| `og:description` | First ~160 chars of plain-text content |
| `og:image` | `assetUrl(cover_photo.id)` if cover photo exists |
| `og:type` | `article` |
| `twitter:card` | `summary_large_image` if cover photo, else `summary` |

The excerpt logic (strip markdown, truncate) already exists in `blog/+page.svelte` and will be extracted to a shared utility.

---

## 7. File Checklist

- `src/lib/api.ts` — update `Article` type, add `incrementViews` / `incrementLikes`
- `src/routes/api/articles/[id]/view/+server.ts` — new
- `src/routes/api/articles/[id]/like/+server.ts` — new
- `src/routes/blog/[slug]/+page.svelte` — views/likes display, like button, share button, OG tags
- `src/routes/blog/+page.svelte` — views/likes display on list
- Directus admin — manually add `views` and `likes` fields (out of band)
