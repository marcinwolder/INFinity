/** @type {import('tailwindcss').Config} */

import daisyuiPlugin from 'daisyui';
import opentypePlugin from 'tailwindcss-opentype';
import tailwindTextShadowPlugin from '@designbycode/tailwindcss-text-shadow';
import { themeNames } from './src/utils/theme.ts';

export const content = ['./index.html', './src/**/*.{js,ts,jsx,tsx}'];
export const theme = {
	extend: {
		textShadow: {
			codeBack: '0 0 40px rgba(0,0,0,0.5)',
		},
		colors: {
			stara: '#8c8c8c',
			2015: '#bfbfbf',
			2023: '#d5b8ea',
		},
	},
};
export const plugins = [
	opentypePlugin,
	daisyuiPlugin,
	tailwindTextShadowPlugin,
];
export const daisyui = {
	themes: themeNames,
};
