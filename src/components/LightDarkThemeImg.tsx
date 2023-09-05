import React from 'react';
import useLightDarkThemeValue from '../hooks/useThemeBasedValue';

const ThemeImg: React.FC<
	{ light: string; dark: string } & React.ComponentProps<'img'>
> = ({ dark, light, className, ...props }) => {
	const imgUrl = useLightDarkThemeValue(light, dark);

	return (
		<img
			className={'select-none ' + className}
			draggable={false}
			{...props}
			src={imgUrl}
			alt='Logo'
		/>
	);
};

export default ThemeImg;
