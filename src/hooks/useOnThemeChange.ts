import { Themes } from '../utils/theme';

type Callback = (theme: Themes) => void;

/**
 * @returns func {@link addCallback}
 */
const useOnThemeChange = () => {
	const callbacks: Callback[] = [];

	/**
	 * use to add callbacks for theme change event
	 * @param callback {@link Callback | type}
	 * @returns void
	 * @example
	 * ```
	 * addCallback((cb:Themes)=>console.log(cb))
	 * ```
	 */
	const addCallback = (callback: Callback) => {
		callbacks.push(callback);
	};

	const observer = new MutationObserver((mut) => {
		const mut2 = mut.at(-1);
		if (
			mut2 &&
			mut2.type === 'attributes' &&
			mut2.attributeName === 'data-theme'
		) {
			callbacks.forEach((cb) =>
				cb(window.localStorage.getItem('theme') as Themes)
			);
		}
	});
	observer.observe(document.documentElement, { attributes: true });
	return addCallback;
};

export default useOnThemeChange;
