import { configureStore } from '@reduxjs/toolkit';
import { answerSlice } from './slices/answers';
import { pathSlice } from './slices/path';

const store = configureStore({
	reducer: {
		answers: answerSlice.reducer,
		path: pathSlice.reducer,
	},
});

export type StateStore = ReturnType<typeof store.getState>;
export default store;
