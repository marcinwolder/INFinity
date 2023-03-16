import { modalSlice } from './slices/modal';
import { configureStore } from '@reduxjs/toolkit';
import { answearSlice } from './slices/answers';
import { pathSlice } from './slices/path';

const store = configureStore({
	reducer: {
		answers: answearSlice.reducer,
		path: pathSlice.reducer,
		modal: modalSlice.reducer,
	},
});

export type StateStore = ReturnType<typeof store.getState>;
export default store;
