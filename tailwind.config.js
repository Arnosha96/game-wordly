/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin-slow 0.6s ease-out forwards",
      },
      keyframes: {
        "spin-slow": {
          "0%": {
            transform: "rotateX(0deg)",
            color: "black",
            backgroundColor: "white",
            borderWidth: 2,
            borderColor: '#d4d4d4'
          },
          "25%": {
            transform: "rotateX(45deg)",
            color: "black",
            backgroundColor: "white",
            borderWidth: 2,
            borderColor: '#d4d4d4'
          },
          "40%": {
            transform: "rotateX(90deg)",
          },
          "50%": { transform: "rotateX(90deg)" },
          "60%": { transform: "rotateX(90deg)" },
          "75%": { transform: "rotateX(45deg)" },
          "100%": { transform: "rotateX(0deg)" },
        },
      },
    },
  },
};
