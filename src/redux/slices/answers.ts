import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface matura {
	year: number;
	month: number;
	formula: '2023' | '2015' | 'stara';
	answers: { [keys: number]: string[] | boolean[] | number[] };
}

export const answearSlice = createSlice({
	name: 'answers',
	initialState: [] as matura[],
	reducers: {
		changeAns(state, action: PayloadAction<matura>) {
			const { year, month, formula, answers } = action.payload;
			const index = state.findIndex(
				(el) => el.year === year && el.month === month && el.formula === formula
			);
			if (index === -1) {
				state.push({
					formula: '2015',
					year: 2022,
					month: 5,
					answers,
				});
			} else {
				Object.assign(state[index].answers, answers);
			}
		},
	},
});
