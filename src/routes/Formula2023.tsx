import React, { useState } from 'react';
import { usePath } from '../context/menuContext';
import PythonCompiler from '../components/PythonCompiler';

const Main = () => {
	usePath('/formula-2023');
	const [result, setResult] = useState('');
	return (
		<div>
			<button
				onClick={() => {
					// result
					console.log('🚀 ~ file: Formula2023.tsx:12 ~ Main ~ result:', result);
				}}>
				Print
			</button>
			<PythonCompiler
				dataPath='pary.txt'
				testPath='pary.txt'
				setResult={setResult}
			/>
		</div>
	);
};

export default Main;
