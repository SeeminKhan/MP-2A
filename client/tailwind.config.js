/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        customPink: '#e2bab3',
        beigeWhite: '#fff',
      },
    },
  },
  plugins: [],
}

