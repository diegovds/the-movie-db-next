import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      extend: {
        minHeight: {
          dvh: ['100vh /* fallback for Opera, IE and etc. */', '100dvh'],
        },
      },
    },
  },
  plugins: [],
} satisfies Config
