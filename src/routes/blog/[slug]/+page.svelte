<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { runCommand } from '$lib/tui/commands/index.js';
  import CommandLine from '$lib/components/tui/CommandLine.svelte';
  import { assetUrl } from '$lib/api.js';
  import type { PageData } from './$types.js';

  export let data: PageData;

  const { article, contentHtml } = data;

  let input = '';
  let inputEl: HTMLInputElement | undefined = undefined;

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

  onMount(() => inputEl?.focus());
</script>

<svelte:head>
  <title>{article.title}</title>
</svelte:head>

<main class="font-mono text-sm sm:text-base flex-1 min-h-0 flex flex-col">
<div class="flex-1 min-h-0 overflow-auto p-4 sm:p-6">
  <a href="/blog" class="inline-block mb-4 text-primary-700 hover:text-primary-400 transition-colors text-xs">← blog</a>
  <p class="mb-1 text-primary-400">{article.title}</p>
  <p class="mb-6 text-primary-700 text-xs">{formatDate(article.date_created)}</p>

  {#if article.cover_photo}
    <div class="mb-6 border border-primary-800 max-w-lg">
      <img
        src={assetUrl(article.cover_photo.id, { width: '800', format: 'webp' })}
        alt={article.cover_photo.title ?? article.title}
        class="w-full h-auto"
      />
    </div>
  {/if}

  <div class="article-content text-primary-400 max-w-prose">
    {@html contentHtml}
  </div>

  {#if article.gallery.length > 0}
    <div class="mt-8">
      <p class="mb-3 text-primary-700 text-xs">gallery</p>
      <div class="grid grid-cols-2 sm:grid-cols-3 gap-2">
        {#each article.gallery as { directus_files_id: file }}
          <div class="border border-primary-800">
            <img
              src={assetUrl(file.id, { width: '400', format: 'webp' })}
              alt={file.title ?? ''}
              class="w-full h-auto"
            />
          </div>
        {/each}
      </div>
    </div>
  {/if}
</div>

<div class="shrink-0 px-4 sm:px-6 py-3 border-t border-primary-800">
  <CommandLine bind:value={input} bind:inputEl emptyHint='type "cd blog" to go back' on:submit={handleSubmit} />
</div>
</main>

<style>
  .article-content :global(h1),
  .article-content :global(h2),
  .article-content :global(h3) {
    color: rgb(var(--color-primary-300));
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    font-family: 'Orbitron Variable', sans-serif;
    letter-spacing: 0.05em;
  }
  .article-content :global(h1) { font-size: 1.25rem; }
  .article-content :global(h2) { font-size: 1.1rem; }
  .article-content :global(h3) { font-size: 1rem; }

  .article-content :global(p) {
    margin-bottom: 1rem;
    line-height: 1.75;
  }

  .article-content :global(a) {
    color: rgb(var(--color-primary-300));
    text-decoration: underline;
    text-underline-offset: 3px;
  }

  .article-content :global(code) {
    background: rgba(var(--color-primary-900), 0.5);
    color: rgb(var(--color-primary-300));
    padding: 0.1em 0.4em;
    border-radius: 2px;
    font-size: 0.9em;
  }

  .article-content :global(pre) {
    background: rgba(var(--color-surface-900), 0.8);
    border: 1px solid rgb(var(--color-primary-800));
    padding: 1rem;
    overflow-x: auto;
    margin-bottom: 1rem;
  }

  .article-content :global(pre code) {
    background: none;
    padding: 0;
  }

  .article-content :global(ul),
  .article-content :global(ol) {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  .article-content :global(li) {
    margin-bottom: 0.25rem;
    color: rgb(var(--color-primary-400));
  }

  .article-content :global(blockquote) {
    border-left: 2px solid rgb(var(--color-primary-700));
    padding-left: 1rem;
    color: rgb(var(--color-primary-600));
    margin-bottom: 1rem;
  }

  .article-content :global(hr) {
    border-color: rgb(var(--color-primary-800));
    margin: 1.5rem 0;
  }

  .article-content :global(img) {
    max-width: 100%;
    border: 1px solid rgb(var(--color-primary-800));
  }
</style>
