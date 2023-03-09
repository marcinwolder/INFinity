import { Store } from './../index';
import _ from 'lodash';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

export const pathSlice = createSlice({
	name: 'path',
	initialState: ['/strona-główna'] as string[],
	reducers: {
		loadPath(state, action: PayloadAction<string>) {
			console.log([...state]);
			state.push(action.payload);
			console.log([...state]);
		},
		unloadPath(state) {
			state.pop();
		},
	},
});

export const usePath = (name: string) => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(pathSlice.actions.loadPath(name));
		return () => {
			dispatch(pathSlice.actions.unloadPath());
		};
	});
};

export const usePathElements = () => {
	const path = useSelector((state: Store) => state.path, _.isEqual);
	const urlBlocks = [...path];
	urlBlocks.reverse();
	return urlBlocks;
};

export const useUrl = () => {
	const urlBlocks = usePathElements();
	urlBlocks.pop();
	return urlBlocks.join('');
};
