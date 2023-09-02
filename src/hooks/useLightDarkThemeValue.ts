import { useState } from 'react';
import { darkThemeNames } from '../utils/theme';

/**
	 * Return value based on current theme
   @param light Value returned when theme is "light"
   @param dark Value returned when theme is "dark"
	 */
const useLightDarkThemeValue = <T>(light: T, dark: T) => {
	const getValue = () => {
		const currentTheme = window.localStorage.getItem('theme');
		const darkTheme = darkThemeNames.find(
			(validDarkTheme) => validDarkTheme === currentTheme
		);
		return darkTheme ? dark : light;
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

export default useLightDarkThemeValue;
