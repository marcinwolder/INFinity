import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export const modalSlice = createSlice({
	name: 'modal',
	initialState: {
		signUp: false,
		logIn: false,
	},
	reducers: {
		setOpen(
			state,
			action: PayloadAction<{ type: 'signUp' | 'logIn'; value: boolean }>
		) {
			state[action.payload.type] = action.payload.value;
		},
		switch(state, action: PayloadAction<{ type: 'signUp' | 'logIn' }>) {
			state[action.payload.type] = !state[action.payload.type];
		},
	},
});
