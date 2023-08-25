export const themeNames = [
	'dark',
	'emerald',
	'valentine',
	'halloween',
] as const;

export type Themes = (typeof themeNames)[number];
