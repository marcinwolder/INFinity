import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		signUp: false,
		signIn: false,
		transition: false,
	},
	reducers: {
		setOpen(
			state,
			action: PayloadAction<{ type: 'signUp' | 'signIn'; value: boolean }>
		) {
			state[action.payload.type] = action.payload.value;
		},
		switch(state, action: PayloadAction<{ type: 'signUp' | 'signIn' }>) {
			state[action.payload.type] = !state[action.payload.type];
		},
		transitionStart(state) {
			state.transition = true;
		},
		transitionEnd(state) {
			state.transition = false;
		},
	},
});
