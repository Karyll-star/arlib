// tailwind.config.js
const { hairlineWidth } = require("nativewind/theme");

module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#398779',
        background: '#F9FBFB',
        'text-main': '#2C3333',
        accent: '#D4A373',
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
    },
  },
  plugins: [],
};