import { useState } from 'react';
import { Themes, darkThemeNames } from '../utils/theme';
import useOnThemeChange from './useOnThemeChange';

export type ThemeOptions<T> = {
	[keys in Themes]?: T;
} & { default: T };

/**
   @param light Value returned when theme is "light"
   @param dark Value returned when theme is "dark"
   @return light or dark value
	 */
function useThemeBasedValue<T>(light: T, dark: T): T;

/**
 *
 * @param options {@link ThemeOptions | Options} object
 * @return value corresponding to current theme or default if not specified
 */
function useThemeBasedValue<T>(options: ThemeOptions<T>): T;
function useThemeBasedValue<T>(
	...params: [light: T, dark: T] | [ThemeOptions<T>]
) {
	const addCallback = useOnThemeChange();

	const [value, setValue] = useState<T>();
	if (params.length === 2) {
		const [light, dark] = params;
		setValue(
			darkThemeNames.find(
				(validDarkTheme) =>
					validDarkTheme === window.localStorage.getItem('theme')
			)
				? dark
				: light
		);
		addCallback((theme: Themes) => {
			const darkTheme = darkThemeNames.find(
				(validDarkTheme) => validDarkTheme === theme
			);
			setValue(darkTheme ? dark : light);
		});
	} else {
		const [options] = params;
		setValue(options.default);
		addCallback((theme) => setValue(options[theme]));
	}

	return value;
}

export default useThemeBasedValue;
