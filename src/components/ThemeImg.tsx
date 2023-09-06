import React from 'react';
import useThemeBasedValue, { ThemeOptions } from '../hooks/useThemeBasedValue';
import classNames from 'classnames';

const ThemeImg: React.FC<
	({ options: ThemeOptions<string> } | { light: string; dark: string }) &
		React.ComponentProps<'img'>
> = ({ className, ...props }) => {
	let funcProps: [string, string] | [ThemeOptions<string>];
	if ('options' in props) {
		funcProps = [props.options];
	} else {
		funcProps = [props.light, props.dark];
	}
	//TODO: check how to get rid of ts-ignore
	/*eslint-disable*/
	//@ts-ignore
	const imgUrl = useThemeBasedValue<string>(...funcProps);
	/*eslint-enable*/

	return (
		<img
			className={classNames('select-none', className)}
			draggable={false}
			{...props}
			src={imgUrl}
			alt='Logo'
		/>
	);
};

export default ThemeImg;
