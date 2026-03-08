<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import type { HistoryEntry } from '$lib/tui/types.js';
  import { runCommand } from '$lib/tui/commands/index.js';
  import Tui from '$lib/components/tui/Tui.svelte';

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

  onMount(() => inputEl?.focus());
</script>

<svelte:head>
  <title>Blog</title>
</svelte:head>

<main class="font-mono text-sm sm:text-base flex-1 min-h-0 flex flex-col">
  <Tui {history} bind:value={input} bind:inputEl inputPlaceholder='type "cd" to go back home' on:submit={handleSubmit}>
    <div slot="content" class="mb-4 tui-content-enter">
      <p class="mb-6 text-primary-400">blog</p>
      <p class="mb-4 text-primary-500">Nothing here yet.</p>
    </div>
  </Tui>
</main>
