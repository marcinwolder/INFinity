/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				stara: '#bfbfbf',
				2015: '#bfbfbf',
				2023: '#d5b8ea',
			},
		},
	},
	plugins: [require('tailwindcss-opentype'), require('daisyui')],
	daisyui: {
		themes: ['dark', 'emerald'],
	},
};
