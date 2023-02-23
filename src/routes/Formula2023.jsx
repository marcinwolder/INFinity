import React, { useRef, useEffect } from 'react';
import { usePath } from '../context/menuContext';
import { ImBin } from 'react-icons/im';

const Formula2023 = () => {
	const terminalRef = useRef();
	const replRef = useRef();
	usePath('/formula-2023');
	useEffect(() => {
		setTimeout(() => {
			console.dir(replRef.current);
			replRef.current.children[0].children[1].children[2].classList.add(
				'opacity-80',
				'hover:opacity-100',
				'hover:animate-pulse'
			);
		}, 500);
	}, []);
	return (
		<>
			<div id='output' className='invisible h-0'></div>
			<py-repl ref={replRef} output='output'>
				{'hello = "Hello world!"\nprint(hello)'}
			</py-repl>
			<div>
				<button
					className='absolute right-2 translate-y-2 hover:text-red-400 active:text-red-600'
					onClick={() => {
						terminalRef.current.children[0].innerText = '';
					}}>
					<ImBin />
				</button>
				<py-terminal ref={terminalRef}></py-terminal>
			</div>
		</>
	);
};

export default Formula2023;
