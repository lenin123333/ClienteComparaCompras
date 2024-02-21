/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html","./src/**/*.jsx"],
  theme: {
    extend: {
      screens: {
        'sm': '480px',  // Personaliza la breakpoint 'sm' a 480 píxeles
        'md': '768px',  // Personaliza la breakpoint 'md' a 768 píxeles
        'lg': '1024px', // Personaliza la breakpoint 'lg' a 1024 píxeles
        'xl': '1280px', // Personaliza la breakpoint 'xl' a 1280 píxeles
      },
    },
  },
  plugins: [],
}

