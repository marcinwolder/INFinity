/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {},
	},
	plugins: [require('tailwindcss-opentype'), require('daisyui')],
	daisyui: {
		themes: ['retro', 'dark'],
	},
};
