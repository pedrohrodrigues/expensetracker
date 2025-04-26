/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        secondary: 'var(--secondary-color)',
        mainBackground: 'var(--main-background)',
        sidebar: 'var(--sidebar-background)',
      },
    },
  },
  plugins: [],
};
