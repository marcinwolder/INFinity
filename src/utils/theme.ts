export const themeNames = [
	'dark',
	'emerald',
	'valentine',
	'halloween',
] as const;

export const darkThemeNames = ['dark', 'halloween'] as const;

export type Themes = (typeof themeNames)[number];
export type DarkThemes = (typeof darkThemeNames)[number];
