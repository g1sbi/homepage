<script lang="ts">
  import { enhance } from '$app/forms';
  import { tick } from 'svelte';
  import { marked } from 'marked';
  import type { PageData, ActionData } from './$types.js';

  export let data: PageData;
  export let form: ActionData;

  let tab: 'edit' | 'preview' = 'edit';
  let content = data.article.content ?? '';
  let title = data.article.title ?? '';
  let slug = data.article.slug ?? '';
  let status: 'draft' | 'published' = data.article.status;
  let uploading = false;
  let saving = false;
  let textarea: HTMLTextAreaElement;

  $: previewHtml = tab === 'preview' ? String(marked.parse(content)) : '';

  async function handleImageUpload(e: Event) {
    const input = e.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) return;

    uploading = true;
    const fd = new FormData();
    fd.append('file', file);

    try {
      const res = await fetch('/admin/upload', { method: 'POST', body: fd });
      if (res.ok) {
        const { url } = await res.json();
        insertAtCursor(`![](${url})`);
      }
    } finally {
      uploading = false;
      input.value = '';
    }
  }

  function insertAtCursor(text: string) {
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    content = content.slice(0, start) + text + content.slice(end);
    tick().then(() => {
      textarea.selectionStart = textarea.selectionEnd = start + text.length;
      textarea.focus();
    });
  }

  function wrap(before: string, after = before) {
    if (!textarea) return;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selected = content.slice(start, end) || 'text';
    const replacement = `${before}${selected}${after}`;
    content = content.slice(0, start) + replacement + content.slice(end);
    tick().then(() => {
      textarea.selectionStart = start + before.length;
      textarea.selectionEnd = start + before.length + selected.length;
      textarea.focus();
    });
  }
</script>

<div class="font-mono text-sm flex flex-col h-full">
  <!-- Header row -->
  <div class="shrink-0 flex items-center gap-3 pb-3 border-b border-primary-800 flex-wrap gap-y-2">
    <a href="/admin" class="text-primary-700 hover:text-primary-400 transition-colors">←</a>
    <input
      bind:value={title}
      class="flex-1 min-w-0 bg-transparent text-primary-300 text-sm focus:outline-none border-b border-transparent focus:border-primary-800 transition-colors"
      placeholder="Title"
    />
    <button
      type="button"
      on:click={() => (status = status === 'published' ? 'draft' : 'published')}
      class="shrink-0 text-xs px-2 py-0.5 border transition-colors {status === 'published'
        ? 'border-green-800 text-green-600 hover:bg-green-900/20'
        : 'border-yellow-900 text-yellow-700 hover:bg-yellow-900/20'}"
    >
      {status}
    </button>
  </div>

  <!-- Slug -->
  <div class="shrink-0 flex items-center gap-1 py-1.5 border-b border-primary-900">
    <span class="text-primary-800 text-xs">/blog/</span>
    <input
      bind:value={slug}
      class="flex-1 bg-transparent text-primary-700 text-xs focus:outline-none focus:text-primary-500 transition-colors"
      placeholder="slug"
    />
  </div>

  <!-- Tabs -->
  <div class="shrink-0 flex border-b border-primary-800">
    <button
      type="button"
      on:click={() => (tab = 'edit')}
      class="px-4 py-2 text-xs uppercase tracking-widest transition-colors {tab === 'edit'
        ? 'text-primary-300 border-b border-primary-500 -mb-px'
        : 'text-primary-700 hover:text-primary-500'}"
    >edit</button>
    <button
      type="button"
      on:click={() => (tab = 'preview')}
      class="px-4 py-2 text-xs uppercase tracking-widest transition-colors {tab === 'preview'
        ? 'text-primary-300 border-b border-primary-500 -mb-px'
        : 'text-primary-700 hover:text-primary-500'}"
    >preview</button>
  </div>

  <!-- Content area -->
  <div class="flex-1 min-h-0 overflow-hidden">
    {#if tab === 'edit'}
      <textarea
        bind:this={textarea}
        bind:value={content}
        class="w-full h-full bg-transparent text-primary-400 text-sm leading-relaxed resize-none focus:outline-none p-3 pb-4 font-mono"
        placeholder="start writing..."
        spellcheck="true"
      ></textarea>
    {:else}
      <div class="article-content overflow-y-auto h-full p-3 text-primary-400">
        {@html previewHtml}
      </div>
    {/if}
  </div>

  <!-- Sticky bottom toolbar -->
  <div class="shrink-0 sticky bottom-0 flex items-center gap-1.5 border-t border-primary-800 py-2 px-2 bg-[#0a0a0a]">
    <button type="button" class="tbtn font-bold" on:click={() => wrap('**')}>B</button>
    <button type="button" class="tbtn italic" on:click={() => wrap('*')}>I</button>
    <button type="button" class="tbtn" on:click={() => insertAtCursor('\n## ')}>H</button>
    <button type="button" class="tbtn text-xs" on:click={() => insertAtCursor('\n```\n\n```')}>{'<>'}</button>

    <label class="tbtn cursor-pointer {uploading ? 'opacity-40 pointer-events-none' : ''}" title="Upload image">
      {uploading ? '…' : '📷'}
      <input type="file" accept="image/*" capture="environment" class="hidden" on:change={handleImageUpload} disabled={uploading} />
    </label>

    <span class="flex-1"></span>

    {#if form?.error}
      <span class="text-red-500 text-xs">{form.error}</span>
    {:else if form?.success}
      <span class="text-green-600 text-xs">saved</span>
    {/if}

    <form
      method="POST"
      action="?/save"
      use:enhance={() => {
        saving = true;
        return async ({ update }) => {
          saving = false;
          await update({ invalidateAll: false });
        };
      }}
    >
      <input type="hidden" name="title" value={title} />
      <input type="hidden" name="slug" value={slug} />
      <input type="hidden" name="content" value={content} />
      <input type="hidden" name="status" value={status} />
      <button
        type="submit"
        disabled={saving}
        class="text-xs px-3 py-1.5 border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-black transition-colors disabled:opacity-40 uppercase tracking-widest"
      >
        {saving ? '…' : 'save'}
      </button>
    </form>
  </div>
</div>

<style>
  .tbtn {
    @apply w-8 h-8 flex items-center justify-center text-xs border border-primary-900 text-primary-600 hover:border-primary-700 hover:text-primary-400 transition-colors font-mono shrink-0;
  }

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
  .article-content :global(p) { margin-bottom: 1rem; line-height: 1.75; }
  .article-content :global(a) { color: rgb(var(--color-primary-300)); text-decoration: underline; text-underline-offset: 3px; }
  .article-content :global(code) { background: rgba(var(--color-primary-900), 0.5); color: rgb(var(--color-primary-300)); padding: 0.1em 0.4em; font-size: 0.9em; }
  .article-content :global(pre) { background: rgba(var(--color-surface-900), 0.8); border: 1px solid rgb(var(--color-primary-800)); padding: 1rem; overflow-x: auto; margin-bottom: 1rem; }
  .article-content :global(pre code) { background: none; padding: 0; }
  .article-content :global(ul), .article-content :global(ol) { padding-left: 1.5rem; margin-bottom: 1rem; }
  .article-content :global(li) { margin-bottom: 0.25rem; }
  .article-content :global(blockquote) { border-left: 2px solid rgb(var(--color-primary-700)); padding-left: 1rem; color: rgb(var(--color-primary-600)); margin-bottom: 1rem; }
  .article-content :global(img) { max-width: 100%; border: 1px solid rgb(var(--color-primary-800)); }
  .article-content :global(hr) { border-color: rgb(var(--color-primary-800)); margin: 1.5rem 0; }
</style>
