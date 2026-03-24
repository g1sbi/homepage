<script lang="ts">
  import type { ActionData } from './$types.js';
  export let form: ActionData;
</script>

<div class="flex flex-col gap-6 max-w-xs mx-auto mt-12 font-mono text-sm">
  <p class="text-primary-500 tracking-widest uppercase text-xs">admin login</p>
  <form method="POST" class="flex flex-col gap-4">
    {#if form?.error}
      <p class="text-red-500 text-xs">{form.error}</p>
    {/if}
    <div class="flex flex-col gap-1">
      <label class="text-primary-700 text-xs uppercase tracking-widest" for="email">email</label>
      <input
        id="email"
        name="email"
        type="email"
        required
        autocomplete="email"
        class="bg-transparent border border-primary-800 text-primary-300 px-3 py-2 focus:outline-none focus:border-primary-500 transition-colors"
      />
    </div>
    <div class="flex flex-col gap-1">
      <label class="text-primary-700 text-xs uppercase tracking-widest" for="password">password</label>
      <input
        id="password"
        name="password"
        type="password"
        required
        autocomplete="current-password"
        class="bg-transparent border border-primary-800 text-primary-300 px-3 py-2 focus:outline-none focus:border-primary-500 transition-colors"
      />
    </div>
    <button
      type="submit"
      class="border border-primary-500 text-primary-500 hover:bg-primary-500 hover:text-black transition-colors py-2 px-4 mt-2 uppercase tracking-widest text-xs"
    >
      login
    </button>
  </form>
</div>
