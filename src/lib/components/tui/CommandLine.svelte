<script lang="ts">
  import { createEventDispatcher } from 'svelte';
  import { onMount } from 'svelte';

  export let prompt = '$';
  export let commandText: string | undefined = undefined;
  export let value = '';
  export let inputEl: HTMLInputElement | undefined = undefined;
  export let emptyHint = 'type "help" for a list of commands';

  const dispatch = createEventDispatcher<{ submit: void }>();
  const CHAR_MS = 25;

  let displayedCommandText = '';
  let commandDone = false;

  onMount(() => {
    if (commandText === undefined || commandText === '') {
      commandDone = true;
      return;
    }
    let i = 0;
    const id = setInterval(() => {
      if (i < commandText.length) {
        displayedCommandText = commandText.slice(0, i + 1);
        i += 1;
      } else {
        commandDone = true;
        clearInterval(id);
      }
    }, CHAR_MS);
    return () => clearInterval(id);
  });

  function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Enter') {
      e.preventDefault();
      dispatch('submit');
    }
  }
</script>

<p class="flex flex-wrap items-center gap-0 min-w-0">
  <span class="prompt shrink-0">{prompt}</span>
  {#if commandText !== undefined}
    <span class="pl-2">{displayedCommandText}<span class="cursor-blink" class:invisible={commandDone}></span></span>
  {:else}
    <span
      class="relative inline-flex flex-1 min-w-[8rem] cursor-text font-mono text-sm sm:text-base pl-2"
      role="button"
      tabindex="-1"
      on:click={() => inputEl?.focus()}
      on:keydown={() => {}}
    >
      {#if value === ''}
        <span class="inline text-primary-600">{emptyHint}</span><span class="cursor-blink inline"></span>
      {:else}
        <span class="inline">{value}</span><span class="cursor-blink inline"></span>
      {/if}
      <input
        type="text"
        bind:value
        bind:this={inputEl}
        on:keydown={handleKeydown}
        class="absolute inset-0 w-full bg-transparent border-none outline-none text-inherit font-mono text-sm sm:text-base opacity-0 cursor-text caret-transparent"
        spellcheck="false"
        autocomplete="off"
        aria-label="Command input"
      />
    </span>
  {/if}
</p>
