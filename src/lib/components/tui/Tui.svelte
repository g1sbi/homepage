<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { afterUpdate } from 'svelte';
  import type { HistoryEntry } from '$lib/tui/types.js';
  import CommandLine from './CommandLine.svelte';
  import OutputRenderer from './OutputRenderer.svelte';

  export let history: HistoryEntry[] = [];
  export let value = '';
  export let inputEl: HTMLInputElement | undefined = undefined;

  let scrollEl: HTMLDivElement;

  const dispatch = createEventDispatcher<{ submit: void }>();

  function handleSubmit() {
    dispatch('submit');
  }

  afterUpdate(() => {
    scrollEl?.scrollTo({ top: scrollEl.scrollHeight, behavior: 'smooth' });
  });
</script>

<div bind:this={scrollEl} class="flex-1 min-h-0 overflow-auto flex flex-col justify-end">
  <div class="mt-auto">
    {#each history as entry}
      <div class="mb-2">
        <CommandLine prompt="$" commandText={[entry.command, ...entry.args].filter(Boolean).join(' ')} />
        <OutputRenderer result={entry.result} />
      </div>
    {/each}
    <div>
      <CommandLine
        prompt="$"
        bind:value
        bind:inputEl
        on:submit={handleSubmit}
      />
    </div>
  </div>
</div>
