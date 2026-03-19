<script lang="ts">
  import { goto } from '$app/navigation';
  import { onMount } from 'svelte';
  import { runCommand } from '$lib/tui/commands/index.js';

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
    input = '';
  }

  const STRUDEL_LINK="https://strudel.gisbi.me/#cmVnaXN0ZXIoJ3JscGYnLCAoeCxwYXQpID0%2BIHtyZXR1cm4gcGF0LmxwZihwdXJlKHgpLm11bCgxMikucG93KDQpKX0pCnNldEdhaW5DdXJ2ZSh4ID0%2BIE1hdGgucG93KHgsMikpCnNldENwbSgxNzAvNCkKCiRkcnVtczogc3RhY2soCiAgcygiYmQ6MSIpLmJlYXQoIjAsNz8sMTAiLCAxNikuZHVjaygiMzo0OjUiKSwKICBzKCJzZDoyIikuYmVhdCgiNCwxMiIsIDE2KSwKICBzKCJoaDo0ITgiKQopLnJpYigwLDEvNCkKICAub3JiaXQoMikuX3Njb3BlKCkKJGJhc3M6IHMoInN1cGVyc2F3ITgiKQogIC5ub3RlKCI8YyMgZiBkIyBbZCMgYSMyXT4vMiIuc3ViKDEyKSkub3JiaXQoMykKICAucmxwZihzbGlkZXIoMC45MjgpKS5scGVudigiMiIpCgokcmlzZXI6IHMoInB1bHNlITE2IikuZGVjKC4xKS5mbSh0aW1lKS5mbWgodGltZSkub3JiaXQoNSkKCiR2b3g6IHMoInRlcnJ5Iikuc2NydWIoYmVybGluLmZhc3QoMikuc2VnKDgpKQogICAgLnJpYigxMywyKQogIC5kZWxheSguNikuZGVsYXl0aW1lKHJhbmQpCiAgLnNwZWVkKDEuNSkKICAub3JiaXQoNCk%3D"

  let iframeEl: HTMLIFrameElement | undefined;

  function onIframeLoad() {
    // Strudel needs time to initialize its editor after the page loads
    setTimeout(() => {
      iframeEl?.contentWindow?.postMessage({ type: 'strudel-play' }, 'https://strudel.gisbi.me');
    }, 1500);
  }

  onMount(() => inputEl?.focus());
</script>

<svelte:head>
  <title>Music</title>
</svelte:head>

<main class="-m-4 sm:-m-6 flex-1 min-h-0 flex flex-col tui-content-enter">
  <iframe
    bind:this={iframeEl}
    src={STRUDEL_LINK}
    class="flex-1 min-h-0 w-full border-0"
    title="Strudel music playground"
    allow="autoplay; microphone"
    on:load={onIframeLoad}
  ></iframe>
  <div class="font-mono text-sm px-4 sm:px-6 py-2 border-t border-primary-800 flex items-center gap-2 shrink-0">
    <span class="text-primary-500">$</span>
    <input
      bind:this={inputEl}
      bind:value={input}
      on:keydown={(e) => e.key === 'Enter' && handleSubmit()}
      class="flex-1 bg-transparent outline-none text-primary-300 placeholder:text-primary-700"
      placeholder='type "cd" to go back home'
      spellcheck="false"
      autocomplete="off"
    />
  </div>
</main>
