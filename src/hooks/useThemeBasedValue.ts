import { useState } from "react";
import { Themes, darkThemeNames } from "../utils/theme";

export type ThemeOptions<T> = {
  [keys in Themes]?: T;
} & { default: T };

/**
	 * Return value based on current theme
   @param light Value returned when theme is "light"
   @param dark Value returned when theme is "dark"
	 */
function useThemeBasedValue<T>(light: T, dark: T): T;
/**
 *
 * @param options {@link ThemeOptions | Options} object
 * @return value corresponding to current theme or default if not specified
 */
function useThemeBasedValue<T>(options: ThemeOptions<T>): T;
function useThemeBasedValue<T>(
  ...params: [light: T, dark: T] | [options: ThemeOptions<T>]
) {
  const getValue = () => {
    const theme = document.documentElement.getAttribute("data-theme") as Themes;
    if (params.length === 2) {
      const [light, dark] = params;
      const darkTheme = darkThemeNames.find(
        (validDarkTheme) => validDarkTheme === theme,
      );
      return darkTheme ? dark : light;
    } else {
      const [options] = params;
      return options[theme] || (options.default as T);
    }
  };

  const [value, setValue] = useState(getValue());

  const observer = new MutationObserver(function (mutations) {
    mutations.forEach(function (mutation) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "data-theme"
      ) {
        setValue(getValue());
      }
    });
  });

  observer.observe(document.documentElement, {
    attributes: true,
  });

  return value;
}

export default useThemeBasedValue;
