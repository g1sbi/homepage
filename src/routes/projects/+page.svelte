<svelte:head>
  <title>Projects</title>
</svelte:head>

<main class="font-mono text-sm sm:text-base">
  <p class="mb-2">
    <span class="prompt">$</span> cd projects
  </p>
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
  <a href="/" class="text-primary-400 hover:text-primary-300 transition-colors">
    $ cd ..
  </a>
</main>
