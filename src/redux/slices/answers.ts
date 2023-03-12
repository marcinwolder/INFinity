import _ from 'lodash';
import { Formula } from './path';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Answers } from '../../context/testContext';

interface matura {
	date: string;
	formula: Formula;
	answers: { [keys: number]: Answers };
}

export const answearSlice = createSlice({
	name: 'answers',
	initialState: [] as matura[],
	reducers: {
		changeAns(state, action: PayloadAction<matura>) {
			const { date, formula, answers } = action.payload;
			const index = state.findIndex(
				(el) => el.date === date && el.formula === formula
			);
			if (index === -1) {
				state.push({
					formula,
					date,
					answers,
				});
			} else {
				_.assign(state[index].answers, answers);
			}
		},
	},
});
