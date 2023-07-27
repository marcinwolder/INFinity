import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import examsJSON from '../../JSON/exams.json';
import { Formula } from './pathSlice';
import _ from 'lodash';

const initialState: {
	[year: string]: {
		month: string;
		tasks: string[];
		splitParts: number[];
		title: string;
		info?: string;
	}[];
} = {};

export const examsSlice = createSlice({
	name: 'exams',
	initialState,
	reducers: {
		loadExams: (state, action: PayloadAction<Formula>) => {
			const exams = examsJSON[action.payload];

			if (_.isEmpty(exams)) {
				_.keys(state).forEach((key) => delete state[key]);
			}

			exams.forEach((exam) => {
				const { year, month, tasks, splitParts, info = '', title } = exam;
				if (!state[year]) {
					state[year] = [{ month, tasks, splitParts, info, title }];
				} else if (
					!_.filter(state[year], (e) =>
						_.isEqual(e, { month, tasks, splitParts, info, title })
					)
				) {
					state[year].push({ month, tasks, splitParts, info, title });
				}
			});
		},
	},
});
