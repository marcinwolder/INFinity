import { configureStore } from '@reduxjs/toolkit';
import { answearSlice } from './slices/answers';
import { pathSlice } from './slices/path';

const store = configureStore({
	reducer: {
		answers: answearSlice.reducer,
		path: pathSlice.reducer,
	},
});

export type Store = ReturnType<typeof store.getState>;
export default store;
