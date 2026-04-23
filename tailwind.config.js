/** @type {import('tailwindcss').Config} */
module.exports = {
  // app ve components klasörlerindeki tüm dosyaları tara
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        ink: '#1a1612',          
        paper: '#f3ead7',        
        paperWarm: '#ebe0c5',    
        cream: '#f7efdb',        
        terracotta: '#c55a2e',   
        terracottaDeep: '#8a3a1b',
        saffron: '#d49a2a',      
        olive: '#4a5a2e',        
        midnight: '#0f2438',     
        aegean: '#2f5b6e',
        muted: '#7a6a52',        
        line: '#b8a787',         
        lineDark: '#3a2f22',
      },
      fontFamily: {
        outfit: ['Outfit', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}