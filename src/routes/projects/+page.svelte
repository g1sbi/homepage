<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import type { HistoryEntry } from '$lib/tui/types.js';
  import { runCommand } from '$lib/tui/commands/index.js';
  import Tui from '$lib/components/tui/Tui.svelte';

  const initialResult = { type: 'navigate' as const, path: '/projects' };
  let history: HistoryEntry[] = [{ command: 'cd', args: ['projects'], result: initialResult }];
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
  <title>Projects</title>
</svelte:head>

<main class="font-mono text-sm sm:text-base flex-1 min-h-0 flex flex-col">
  <Tui {history} bind:value={input} bind:inputEl inputPlaceholder='type "cd" to go back home' on:submit={handleSubmit}>
    <div slot="content" class="mb-4 tui-content-enter">
      <p class="mb-6 text-primary-400">projects</p>
      <div class="mb-6">
        <a
          href="https://github.com/g1sbi/qaz-cyberdeck"
          target="_blank"
          rel="noopener noreferrer"
          class="block border border-primary-800 hover:border-primary-600 transition-colors max-w-sm"
        >
          <div class="aspect-video w-full overflow-hidden bg-surface-900 border-b border-primary-800">
            <img
              src="/cyberdeck.jpg"
              alt=""
              class="h-full w-full object-cover"
            />
          </div>
          <div class="p-3 border-t-0 border-primary-800">
            <span class="text-primary-300">qaz-cyberdeck</span>
            <span class="text-primary-600 ml-2">—</span>
            <span class="text-primary-500 ml-2">A cyberdeck featuring a QAZ keyboard and Banana Pi M2 Zero</span>
          </div>
        </a>
      </div>
    </div>
  </Tui>
</main>
