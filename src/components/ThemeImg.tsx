import React from 'react';
import useThemeBasedValue from '../hooks/useThemeBasedValue';

const ThemeImg: React.FC<
	{ light: string; dark: string } & React.ComponentProps<'img'>
> = ({ light, dark, ...props }) => {
	const imgUrl = useThemeBasedValue(light, dark);

	return <img {...props} src={imgUrl} alt='Logo' />;
};

export default ThemeImg;
