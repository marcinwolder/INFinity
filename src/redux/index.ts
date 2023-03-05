import { configureStore } from '@reduxjs/toolkit';
import { answearSlice } from './slices/answers';

const store = configureStore({
	reducer: {
		answers: answearSlice.reducer,
	},
});

export default store;
