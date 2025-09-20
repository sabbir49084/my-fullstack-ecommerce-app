/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 🌙 Dark mode class-based
  content: [
    "./public/index.html", // Static HTML (optional)
    "./src/**/*.{js,jsx,ts,tsx}", // All React components
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2563eb',     // 🔵 Tailwind blue-600
        secondary: '#64748b',   // ⚪ Cool gray-500
        success: '#22c55e',
        warning: '#f59e0b',
        danger: '#ef4444',
        dark: '#0f172a',
        light: '#f8fafc',
        accent: '#4f46e5',      // Indigo-600 for accent
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.1)',
        glow: '0 0 12px rgba(37, 99, 235, 0.6)',
      },
      zIndex: {
        60: '60',
        70: '70',
        80: '80',
        90: '90',
      },
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-in-out',
        slideIn: 'slideIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),      // For better form styling
    require('@tailwindcss/typography'), // For blog/content styling
    require('tailwind-scrollbar'),      // Optional: for custom scrollbars
    require('@tailwindcss/aspect-ratio'), // Useful for media/images
  ],
};
