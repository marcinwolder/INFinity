import React, { useRef, useEffect, useState } from 'react';
import { usePath } from '../../context/menuContext';
import { VscRunAll } from 'react-icons/vsc';

const Formula2023 = ({ dataPath, testPath, setResult }) => {
	const terminalRef = useRef();
	const replRef = useRef();
	usePath('/formula-2023');
	useEffect(() => {
		setTimeout(() => {
			const btn = replRef.current.children[0].children[1].children[2];
			btn.classList.add('invisible');
		}, 3000);
	}, []);
	return (
		<div className='w-1/2'>
			<div id='output' className='invisible h-0'></div>
			<div className='bg-warning text-warning-content'>
				<py-repl ref={replRef} output='output'>
					{`
            with open("${dataPath}") as file:
                data = list(map(lambda x: str(x).strip(), file.readlines()))
            with open("${testPath}") as file:
                test = list(map(lambda x: str(x).strip(), file.readlines()))
            # ----
            # YOUR REAL DATA IS IN [data] LIST
            # AND YOUR TEST DATA IS IN [test] LIST
            
            for line in data:
                print(line)
            `}
				</py-repl>
			</div>
			<div className='relative'>
				<button
					className='absolute flex items-center gap-1 right-2 top-2 bg-black pl-2 text-white hover:text-green-400 active:text-green-600'
					onClick={(e) => {
						const btn = replRef.current.children[0].children[1].children[2];
						terminalRef.current.children[0].innerText = '';
						btn.click();
						setResult(terminalRef.current.children[0].innerText);
					}}>
					RUN <VscRunAll />
				</button>
				<py-terminal ref={terminalRef}></py-terminal>
			</div>
			{/* TODO: input or button for result check */}
		</div>
	);
};

export default Formula2023;
