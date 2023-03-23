import { authSlice } from './slices/auth';
import { configureStore } from '@reduxjs/toolkit';
import { answearSlice } from './slices/answers';
import { pathSlice } from './slices/path';

const store = configureStore({
	reducer: {
		answers: answearSlice.reducer,
		path: pathSlice.reducer,
		auth: authSlice.reducer,
	},
});

export type StateStore = ReturnType<typeof store.getState>;
export default store;
