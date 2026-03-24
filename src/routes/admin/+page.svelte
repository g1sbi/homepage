<script lang="ts">
  import { enhance } from '$app/forms';
  import type { PageData } from './$types.js';
  export let data: PageData;
</script>

<div class="font-mono text-sm flex flex-col gap-4">
  <div class="flex items-center justify-between">
    <p class="text-primary-500 text-xs uppercase tracking-widest">articles</p>
    <div class="flex items-center gap-2">
      <form method="POST" action="?/create" use:enhance>
        <button type="submit" class="text-xs px-2 py-1 border border-primary-800 text-primary-600 hover:border-primary-500 hover:text-primary-400 transition-colors">
          + new
        </button>
      </form>
      <form method="POST" action="?/logout" use:enhance>
        <button type="submit" class="text-xs px-2 py-1 border border-primary-900 text-primary-800 hover:border-primary-700 hover:text-primary-600 transition-colors">
          logout
        </button>
      </form>
    </div>
  </div>

  <div class="flex flex-col">
    {#each data.articles as article}
      <a
        href="/admin/{article.id}"
        class="flex items-center gap-3 py-3 px-2 border-b border-primary-900 hover:bg-primary-900/20 transition-colors group"
      >
        <span
          class="shrink-0 text-xs px-1.5 py-0.5 border {article.status === 'published'
            ? 'border-green-800 text-green-600'
            : 'border-yellow-900 text-yellow-700'}"
        >
          {article.status === 'published' ? 'pub' : 'draft'}
        </span>
        <span class="flex-1 text-primary-400 group-hover:text-primary-300 transition-colors truncate">
          {article.title}
        </span>
        <span class="shrink-0 text-primary-800 text-xs">
          {new Date(article.date_updated).toLocaleDateString()}
        </span>
      </a>
    {/each}
  </div>
</div>
