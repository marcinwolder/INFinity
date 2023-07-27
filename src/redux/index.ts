import { configureStore } from '@reduxjs/toolkit';
import { answerSlice } from './slices/answersSlice';
import { pathSlice } from './slices/pathSlice';
import { pathSlice2 } from './slices/pathSlice2';

const store = configureStore({
	reducer: {
		answers: answerSlice.reducer,
		path: pathSlice.reducer,
		path2: pathSlice2.reducer,
	},
});

export type StateStore = ReturnType<typeof store.getState>;
export default store;
