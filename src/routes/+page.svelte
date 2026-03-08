<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import type { HistoryEntry } from '$lib/tui/types.js';
  import { runCommand } from '$lib/tui/commands/index.js';
  import Tui from '$lib/components/tui/Tui.svelte';

  const whoamiResult = runCommand('whoami', []);
  let history: HistoryEntry[] = [
    { command: 'whoami', args: [], result: whoamiResult }
  ];
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

  onMount(() => {
    inputEl?.focus();
    const lsDelay = 550;
    const t = setTimeout(() => {
      const lsResult = runCommand('ls', []);
      history = [...history, { command: 'ls', args: [], result: lsResult }];
    }, lsDelay);
    return () => clearTimeout(t);
  });
</script>

<svelte:head>
  <title>Home</title>
</svelte:head>

<main class="font-mono text-sm sm:text-base flex-1 min-h-0 flex flex-col">
  <Tui {history} bind:value={input} bind:inputEl on:submit={handleSubmit} />
</main>
