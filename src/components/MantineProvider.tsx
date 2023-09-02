import React from 'react';
import { MantineProvider as _MantineProvider } from '@mantine/styles';
import useLightDarkThemeValue from '../hooks/useLightDarkThemeValue';

const MantineProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const theme = useLightDarkThemeValue('light', 'dark');
	return (
		<_MantineProvider
			theme={{
				colorScheme: theme,
			}}>
			{children}
		</_MantineProvider>
	);
};

export default MantineProvider;
