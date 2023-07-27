import { configureStore } from '@reduxjs/toolkit';
import { answerSlice } from './slices/answersSlice';
import { pathSlice } from './slices/pathSlice';
import { examsSlice } from './slices/examsSlice';

const store = configureStore({
	reducer: {
		answers: answerSlice.reducer,
		path: pathSlice.reducer,
		exams: examsSlice.reducer,
	},
});

export type StateStore = ReturnType<typeof store.getState>;
export default store;
