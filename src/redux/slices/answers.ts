import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export const answearSlice = createSlice({
	name: 'answers',
	initialState: {
		'formula-stara': { 2022: { maj: {} } },
		'formula-2015': { 2022: { maj: {} } },
		'formula-2023': { 2022: { maj: {} } },
	},
	reducers: {
		changeAns(
			state,
			action: PayloadAction<{
				path: [
					'formula-stara' | 'formula-2015' | 'formula-2023',
					number,
					string
				];
				testNum: number;
				answers: any[];
			}>
		) {
			state['formula-2015'][2022].maj = action.payload.answers;
		},
	},
});
