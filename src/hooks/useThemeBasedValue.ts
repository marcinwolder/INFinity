const useThemeBasedValue =
	<T>(light: T, dark: T) =>
	() =>
		document.documentElement.getAttribute('data-theme') === 'dark'
			? light
			: dark;

export default useThemeBasedValue;
