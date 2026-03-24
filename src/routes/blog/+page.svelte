<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import type { HistoryEntry } from '$lib/tui/types.js';
  import { runCommand } from '$lib/tui/commands/index.js';
  import Tui from '$lib/components/tui/Tui.svelte';
  import type { PageData } from './$types.js';

  export let data: PageData;

  const initialResult = { type: 'navigate' as const, path: '/blog' };
  let history: HistoryEntry[] = [{ command: 'cd', args: ['blog'], result: initialResult }];
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
    history = [...history, { command: cmd, args, result }];
    input = '';
    setTimeout(() => inputEl?.focus(), 0);
  }

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

  onMount(() => inputEl?.focus());
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<main class="font-mono text-sm sm:text-base flex-1 min-h-0 flex flex-col">
  <Tui {history} bind:value={input} bind:inputEl inputPlaceholder='type "cd" to go back home' on:submit={handleSubmit}>
    <div slot="content" class="mb-4 tui-content-enter">
      <p class="mb-6 text-primary-400">blog</p>
      {#if data.articles.length === 0}
        <p class="text-primary-600">no published articles yet.</p>
      {:else}
        <ul class="space-y-4 md:w-1/2">
          {#each data.articles as article}
            <li>
              <a
                href="/blog/{article.slug}"
                class="block p-3 text-primary-500 hover:text-primary-300 transition-colors group"
              >
                <div class="flex items-baseline justify-between gap-4">
                  <span class="group-hover:underline underline-offset-2">{article.title}</span>
                  <span class="shrink-0 text-primary-700">{formatDate(article.date_created)}</span>
                </div>
                {#if article.content}
                  <p class="mt-1 text-primary-700 text-xs leading-relaxed">{excerpt(article.content)}</p>
                {/if}
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </Tui>
</main>
