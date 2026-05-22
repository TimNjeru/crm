import frappeUIPreset from 'frappe-ui/tailwind'

export default {
  presets: [frappeUIPreset],
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/frappe-ui/src/**/*.{vue,js,ts,jsx,tsx}',
    '../node_modules/frappe-ui/src/**/*.{vue,js,ts,jsx,tsx}',
    './node_modules/frappe-ui/frappe/**/*.{vue,js,ts,jsx,tsx}',
    '../node_modules/frappe-ui/frappe/**/*.{vue,js,ts,jsx,tsx}',
  ],
  safelist: [
    { pattern: /!(text|bg)-/, variants: ['hover', 'active'] },
    // Specific !important utilities used by index.css @apply directives.
    // Listed explicitly (not as a broad pattern) to avoid OOM during build.
    '!border',
    '!border-b',
    '!border-outline-gray-1',
    '!border-outline-gray-2',
    '!border-outline-gray-3',
    '!rounded-lg',
    '!rounded-xl',
    '!rounded-2xl',
    '!rounded-3xl',
    '!ring-2',
    '!ring-outline-gray-3',
    '!font-semibold',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
