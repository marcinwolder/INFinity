import { useState } from 'react';

const useThemeBasedValue = <T>(light: T, dark: T) => {
	const getValue = () =>
		document.documentElement.getAttribute('data-theme') === 'dark'
			? light
			: dark;

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
