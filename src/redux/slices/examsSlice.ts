import {
	createSelector,
	createSlice,
	PayloadAction,
	Unsubscribe,
} from '@reduxjs/toolkit';
import examsJSON from '../../JSON/exams.json';
import { Formula, useMaturaPath, useUrl } from './pathSlice';
import _ from 'lodash';
import { StateStore } from '..';
import { useSelector, useStore } from 'react-redux';
import { useEffect, useMemo, useState } from 'react';

export interface ExamData {
	formula: Formula;
	year: string;
	month: string;
	tasks: string[];
	splitParts: number[];
	title: string;
	info?: string;
}

const initialState: {
	[year: string]: ExamData[];
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

				const buf = {
					formula: action.payload,
					year,
					month,
					tasks,
					splitParts,
					info,
					title,
				};

				if (!state[year]) {
					state[year] = [buf];
				} else if (!_.filter(state[year], (e) => _.isEqual(e, buf))) {
					state[year].push(buf);
				}
			});
		},
	},
});
