<script lang="ts">
  import { onMount } from 'svelte';
  import type { CommandResult } from '$lib/tui/types.js';

  export let result: CommandResult;

  let displayedName = '';
  let typingDone = false;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  onMount(() => {
    if (result.type !== 'whoami') return;
    const fullName = result.name;
    let i = 0;
    intervalId = setInterval(() => {
      if (i < fullName.length) {
        displayedName = fullName.slice(0, i + 1);
        i += 1;
      } else {
        typingDone = true;
        if (intervalId) clearInterval(intervalId);
      }
    }, 80);
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  });
</script>

{#if result.type === 'text'}
  <div class="my-2 space-y-1 font-mono">
    {#each result.lines as line}
      <p class="min-h-[1.25em] whitespace-pre">{#if line === ''}&nbsp;{:else}{line}{/if}</p>
    {/each}
  </div>
{:else if result.type === 'whoami'}
  <p class="whoami-output flex flex-wrap items-center gap-3 my-2">
    <img
      src={result.avatarSrc}
      alt=""
      class="h-12 w-12 border border-primary-700 object-cover"
    />
    <span class="hero-name text-primary-400">
      {displayedName}<span class="cursor-blink" class:invisible={typingDone}></span>
    </span>
  </p>
{:else if result.type === 'error'}
  <p class="my-2 text-primary-500">{result.message}</p>
{:else if result.type === 'navigate'}
  <!-- parent handles goto -->
{/if}
