import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Sesuaikan warna brand sekolah Anda disini
        maroon: {
          primary: "#800000", // Contoh Merah Marun
          dark: "#600000",
        },
        gold: {
          primary: "#D4AF37", // Contoh Emas
        }
      },
      fontFamily: {
        serif: ['var(--font-serif)', 'serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // PLUGIN PENTING UNTUK BERITA
  ],
};
export default config;