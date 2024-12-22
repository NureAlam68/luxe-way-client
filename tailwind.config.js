import daisyui from 'daisyui';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        gilda: ["Gilda Display", 'serif'],
        roboto: ["Roboto", 'sans-serif'],
      }
    },
  },
  plugins: [daisyui],
}

