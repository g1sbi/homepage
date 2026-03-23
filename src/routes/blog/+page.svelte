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
        <ul class="space-y-1">
          {#each data.articles as article}
            <li>
              <a
                href="/blog/{article.slug}"
                class="flex items-baseline gap-4 text-primary-500 hover:text-primary-300 transition-colors group"
              >
                <span class="shrink-0 text-primary-700">{formatDate(article.date_created)}</span>
                <span class="group-hover:underline underline-offset-2">{article.title}</span>
              </a>
            </li>
          {/each}
        </ul>
      {/if}
    </div>
  </Tui>
</main>
