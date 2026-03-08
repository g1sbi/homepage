<script lang="ts">
  import { onMount } from 'svelte';
  import type { CommandResult } from '$lib/tui/types.js';

  export let result: CommandResult;

  const WHOAMI_CHAR_MS = 80;
  const TEXT_CHAR_MS = 20;

  let whoamiDisplayed = '';
  let whoamiDone = false;
  let textLineIndex = 0;
  let textCharIndex = 0;
  let textDone = false;
  let errorDisplayed = '';
  let errorDone = false;
  let intervalId: ReturnType<typeof setInterval> | null = null;

  function clearTimer() {
    if (intervalId) {
      clearInterval(intervalId);
      intervalId = null;
    }
  }

  onMount(() => {
    if (result.type === 'whoami') {
      const full = result.name;
      let i = 0;
      intervalId = setInterval(() => {
        if (i < full.length) {
          whoamiDisplayed = full.slice(0, i + 1);
          i += 1;
        } else {
          whoamiDone = true;
          clearTimer();
        }
      }, WHOAMI_CHAR_MS);
    } else if (result.type === 'text' && result.lines.length > 0) {
      const lines = result.lines;
      let lineIndex = 0;
      let charIndex = 0;
      intervalId = setInterval(() => {
        if (lineIndex >= lines.length) {
          textDone = true;
          textLineIndex = lines.length;
          clearTimer();
          return;
        }
        const line = lines[lineIndex];
        if (charIndex < line.length) {
          textCharIndex = charIndex + 1;
          textLineIndex = lineIndex;
          charIndex += 1;
        } else {
          lineIndex += 1;
          charIndex = 0;
          textLineIndex = lineIndex;
          textCharIndex = 0;
          if (lineIndex >= lines.length) textDone = true;
          if (lineIndex >= lines.length) clearTimer();
        }
      }, TEXT_CHAR_MS);
    } else if (result.type === 'text') {
      textDone = true;
    } else if (result.type === 'error') {
      const full = result.message;
      let i = 0;
      intervalId = setInterval(() => {
        if (i < full.length) {
          errorDisplayed = full.slice(0, i + 1);
          i += 1;
        } else {
          errorDone = true;
          clearTimer();
        }
      }, TEXT_CHAR_MS);
    }
    return clearTimer;
  });
</script>

{#if result.type === 'text'}
  <div class="my-2 space-y-1 font-mono">
    {#each result.lines.slice(0, textLineIndex) as line, i}
      <p class="min-h-[1.25em] whitespace-pre">{#if line === ''}&nbsp;{:else}{line}{/if}</p>
    {/each}
    {#if !textDone && textLineIndex < result.lines.length}
      <p class="min-h-[1.25em] whitespace-pre">
        {result.lines[textLineIndex].slice(0, textCharIndex)}<span class="cursor-blink" class:invisible={textDone}></span>
      </p>
    {/if}
  </div>
{:else if result.type === 'whoami'}
  <p class="whoami-output flex flex-wrap items-center gap-3 my-2">
    <img
      src={result.avatarSrc}
      alt=""
      class="h-12 w-12 border border-primary-700 object-cover"
    />
    <span class="hero-name text-primary-400">
      {whoamiDisplayed}<span class="cursor-blink" class:invisible={whoamiDone}></span>
    </span>
  </p>
{:else if result.type === 'error'}
  <p class="my-2 text-primary-500">{errorDisplayed}<span class="cursor-blink" class:invisible={errorDone}></span></p>
{:else if result.type === 'navigate'}
  <!-- parent handles goto -->
{/if}
