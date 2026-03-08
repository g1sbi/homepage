import { skeleton } from '@skeletonlabs/tw-plugin';
import { cyberpunkTheme } from './cyberpunk-theme.ts';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{html,js,svelte,ts}',
    './node_modules/@skeletonlabs/skeleton/**/*.{html,js,svelte,ts}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        heading: ['Orbitron', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace']
      }
    }
  },
  plugins: [
    skeleton({
      themes: {
        custom: [cyberpunkTheme]
      }
    })
  ]
};
