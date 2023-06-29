import { configureStore } from '@reduxjs/toolkit';
import { answerSlice } from './slices/answersSlice';
import { pathSlice } from './slices/pathSlice';

const store = configureStore({
	reducer: {
		answers: answerSlice.reducer,
		path: pathSlice.reducer,
	},
});

export type StateStore = ReturnType<typeof store.getState>;
export default store;
