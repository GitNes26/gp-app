/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
      "./*.{js,jsx,ts,tsx}",
      "./app/**/*.{js,jsx,ts,tsx}",
      "./components/**/*.{js,jsx,ts,tsx}",
   ],
   theme: {
      extend: {
         colors: {
            primary: { DEFAULT: "#013C02", 100: "#86bb47", 200: "#017200" },
            secondary: {
               DEFAULT: "#FF9C01",
               100: "#FF9001",
               200: "#FF8E01",
            },
            black: {
               DEFAULT: "#000",
               100: "#1E1E2D",
               200: "#232533",
            },
            gray: {
               DEFAULT: "#E8E8F52D",
               100: "#CDCDE0",
               500: "#6b7280",
            },
         },
         fontFamily: {
            mthin: ["Montserrat-Thin", "sans-serif"],
            mextralight: ["Montserrat-ExtraLight", "sans-serif"],
            mlight: ["Montserrat-Light", "sans-serif"],
            mregular: ["Montserrat-Regular", "sans-serif"],
            mmedium: ["Montserrat-Medium", "sans-serif"],
            msemibold: ["Montserrat-SemiBold", "sans-serif"],
            mbold: ["Montserrat-Bold", "sans-serif"],
            mextrabold: ["Montserrat-ExtraBold", "sans-serif"],
            mblack: ["Montserrat-Black", "sans-serif"],

            pthin: ["Poppins-Thin", "sans-serif"],
            pextralight: ["Poppins-ExtraLight", "sans-serif"],
            plight: ["Poppins-Light", "sans-serif"],
            pregular: ["Poppins-Regular", "sans-serif"],
            pmedium: ["Poppins-Medium", "sans-serif"],
            psemibold: ["Poppins-SemiBold", "sans-serif"],
            pbold: ["Poppins-Bold", "sans-serif"],
            pextrabold: ["Poppins-ExtraBold", "sans-serif"],
            pblack: ["Poppins-Black", "sans-serif"],
         },
      },
   },
   plugins: [],
};
