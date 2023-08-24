import { useState } from 'react';

export const themeNames = [
	'dark',
	'emerald',
	'valentine',
	'halloween',
] as const;

export type Themes = (typeof themeNames)[number];
export type ThemeOptions<T> = {
	[keys in Themes]?: T;
} & { default: T };

const useThemeBasedValue = <T extends O[keyof O], O extends ThemeOptions<T>>(
	options: O
) => {
	const getValue = () => {
		const theme = document.documentElement.getAttribute('data-theme') as Themes;
		return options[theme] || (options.default as T);
	};

	const [value, setValue] = useState(getValue());

	const observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			if (
				mutation.type === 'attributes' &&
				mutation.attributeName === 'data-theme'
			) {
				setValue(getValue());
			}
		});
	});

	observer.observe(document.documentElement, {
		attributes: true,
	});

	return value;
};

export default useThemeBasedValue;
