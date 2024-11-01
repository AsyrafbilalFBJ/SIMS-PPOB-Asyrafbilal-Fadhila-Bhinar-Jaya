const flowbite = require("flowbite-react/tailwind");

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        'ilustrasi': "url('./src/assets/images/Illustrasi Login.png')",
      },
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}