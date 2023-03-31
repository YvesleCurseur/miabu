/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    screens: {
      'sm': {'min': '320px', 'max': '640px'},
      // => @media (min-width: 640px and max-width: 767px) { ... }

      'md': {'min': '641px', 'max': '767px'},
      // => @media (min-width: 768px and max-width: 1023px) { ... }

      'lg': {'min': '768px', 'max': '1023px'},
      // => @media (min-width: 1024px and max-width: 1279px) { ... }

      'xl': {'min': '1023px', 'max': '1279px'},
      // => @media (min-width: 1280px and max-width: 1535px) { ... }

      '2xl': {'min': '1280px'},
      // => @media (min-width: 1536px) { ... }
    },
  },
}
