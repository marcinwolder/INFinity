import React from 'react';
import useThemeBasedValue, { ThemeOptions } from '../hooks/useThemeBasedValue';

const ThemeImg: React.FC<
	{ options: ThemeOptions<string> } & React.ComponentProps<'img'>
> = ({ options, ...props }) => {
	const imgUrl = useThemeBasedValue(options);

	return <img {...props} src={imgUrl} alt='Logo' />;
};

export default ThemeImg;
