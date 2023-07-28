import { createSlice } from '@reduxjs/toolkit';
import { StateStore } from '..';
import { useSelector } from 'react-redux';

export type Formula = 'formula-2015' | 'formula-2023' | 'formula-stara';
export interface MaturaPath {
	formula: 'formula-2015' | 'formula-2023' | 'formula-stara' | undefined;
	date: string | undefined;
}

export const pathSlice = createSlice({
	name: 'path',
	initialState: [] as string[],
	reducers: {
		updatePath: () => {
			const url = window.location.href;
			const hashIndex = url.indexOf('#');
			return url.slice(hashIndex + 2).split('/');
		},
	},
});

export const usePathElements = () => {
	const state = useSelector((state: StateStore) => state.path);
	return ['/strona-główna', ...state.map((e) => `/${e}`)];
};

export const useMaturaPath = () => {
	const state = useSelector((state: StateStore) => state.path);
	const result: MaturaPath = { formula: state[0] as Formula, date: state[1] };
	return result;
};

export const useMaturaColor = () => {
	const maturaPath = useMaturaPath();
	let maturaColor = '';
	switch (maturaPath.formula) {
		case 'formula-stara':
			maturaColor = 'stara';
			break;
		case 'formula-2015':
			maturaColor = '2015';
			break;
		case 'formula-2023':
			maturaColor = '2023';
			break;
	}
	return maturaColor;
};

export const useUrl = () => {
	const state = useSelector((state: StateStore) => state.path);
	return '/' + state.join('/');
};
