import { configureStore } from '@reduxjs/toolkit';
import { answerSlice } from './slices/answersSlice';
import { pathSlice } from './slices/pathSlice';
import { examsSlice } from './slices/examsSlice';
import { userDataApi } from './apis/userDataApi';

const store = configureStore({
	reducer: {
		answers: answerSlice.reducer,
		path: pathSlice.reducer,
		exams: examsSlice.reducer,
		[userDataApi.reducerPath]: userDataApi.reducer,
	},
	middleware(getDefaultMiddleware) {
		return getDefaultMiddleware().concat(userDataApi.middleware);
	},
});

export type StateStore = ReturnType<typeof store.getState>;
export default store;
