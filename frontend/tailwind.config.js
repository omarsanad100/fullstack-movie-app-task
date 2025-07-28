// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

// tailwind.config.ts
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#FFFFFF", // light
          dark: "#15202b", // Twitter dark mode background
        },
        foreground: {
          DEFAULT: "#000000",
          dark: "#E1E8ED", // Twitter-like light text
        },
      },
    },
  },
  plugins: [],
};
