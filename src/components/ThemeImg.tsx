import React, { useState } from 'react';
import useThemeBasedValue from '../hooks/useThemeBasedValue';

const ThemeImg: React.FC<{ light: string; dark: string }> = ({
	light,
	dark,
}) => {
	const getImgUrl = useThemeBasedValue(light, dark);
	const [imgUrl, setImgUrl] = useState(getImgUrl());

	const observer = new MutationObserver(function (mutations) {
		mutations.forEach(function (mutation) {
			if (
				mutation.type === 'attributes' &&
				mutation.attributeName === 'data-theme'
			) {
				setImgUrl(getImgUrl());
			}
		});
	});

	observer.observe(document.documentElement, {
		attributes: true,
	});

	return <img src={imgUrl} className='h-10' alt='Logo' />;
};

export default ThemeImg;
