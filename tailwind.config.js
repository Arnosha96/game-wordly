/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin-slow 0.9s ease-out forwards',
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotateX(0deg)',
            color: 'black',
            backgroundColor: 'white',
            transition: `0.6s`
           },
          '30%': { transform: 'rotateX(54deg)',
            backgroundColor: 'white',
            transition: `0.9s`
           },
           '50%': { transform: 'rotateX(90deg)',
             transition: `0.6s`
           },
          '70%': { transform: 'rotateX(54deg)',
             transition: `0.6s`
           },
          '100%': { transform: 'rotateX(0deg)',
             transition: `0.9s`
           },
        }
      }
    }
  }
}