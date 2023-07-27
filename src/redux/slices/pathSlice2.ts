import _ from 'lodash';
import { createSlice } from '@reduxjs/toolkit';

export type Formula = 'formula-2015' | 'formula-2023' | 'formula-stara';

export const pathSlice2 = createSlice({
	name: 'path2',
	initialState: [] as string[],
	reducers: {
		updatePath: () => {
			const url = window.location.href;
			const hashIndex = url.indexOf('#');
			return url.slice(hashIndex + 2).split('/');
		},
	},
});

// export const usePathElements = () => {
// 	// TODO: ERROR about setting state while updating other component (unknown)
// 	const dispatch = useDispatch();
// 	const state = useSelector((state: StateStore) => state.path, _.isEqual);
// 	if (!state.calibrated && state.blocks.length > 1) {
// 		dispatch(pathSlice2.actions.__switch());
// 	}

// 	return state.blocks;
// };

// export const useMaturaPath = () => {
// 	const path = [...usePathElements()].map((el) => el.replace('/', ''));
// 	path.shift();
// 	const buf = { formula: path[0], date: path[1] } as {
// 		formula: Formula;
// 		date: string | undefined;
// 	};
// 	return buf;
// };

// export const useMaturaColor = () => {
// 	const maturaPath = useMaturaPath();
// 	let maturaColor = '';
// 	switch (maturaPath.formula) {
// 		case 'formula-stara':
// 			maturaColor = 'stara';
// 			break;
// 		case 'formula-2015':
// 			maturaColor = '2015';
// 			break;
// 		case 'formula-2023':
// 			maturaColor = '2023';
// 			break;
// 	}
// 	return maturaColor;
// };

// export const useUrl = () => {
// 	const urlBlocks = [...usePathElements()];
// 	urlBlocks.shift();
// 	return urlBlocks.join('');
// };
