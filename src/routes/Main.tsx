import React from 'react';
import { usePath } from '../context/menuContext';

const Main = () => {
	usePath('');
	return <div>Main Root</div>;
};

export default Main;
