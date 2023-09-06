import React from 'react';
import { MantineProvider as _MantineProvider } from '@mantine/styles';
import useThemeBasedValue from '../hooks/useThemeBasedValue';

const MantineProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
	const theme = useThemeBasedValue('light', 'dark');
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
