<svelte:head>
  <title>Home</title>
</svelte:head>

<main class="font-mono text-sm sm:text-base">
  <div class="mb-10">
    <p class="mb-2">
      <span class="prompt">$</span> whoami
    </p>
    <p class="flex flex-wrap items-center gap-3">
      <img
        src="/pfp.png"
        alt=""
        class="h-12 w-12 border border-primary-700 object-cover"
      />
      <span class="hero-name text-primary-400">Gisbi</span>
    </p>
    <p class="mt-4 cursor-blink">
      <span class="prompt">$</span>
    </p>
  </div>

  <div class="mb-10">
    <p class="mb-3">
      <span class="prompt">$</span> ls projects
    </p>
    <a
      href="https://github.com/g1sbi/qaz-cyberdeck"
      target="_blank"
      rel="noopener noreferrer"
      class="block border border-primary-800 hover:border-primary-600 transition-colors"
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
    <p class="mt-4 cursor-blink">
      <span class="prompt">$</span>
    </p>
  </div>
</main>
