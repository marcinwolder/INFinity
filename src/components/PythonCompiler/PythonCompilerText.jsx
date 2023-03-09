import { useState, useRef, useEffect } from 'react';
import { VscRunAll } from 'react-icons/vsc';
import { GoPlus } from 'react-icons/go';
import { ImBin } from 'react-icons/im';

const PythonCompilerText = ({ setResult, children }) => {
	const [show, setShow] = useState(true);
	const terminalRef = useRef();
	const replRef = useRef();
	const terminalDivRef = useRef();
	useEffect(() => {
		setTimeout(() => {
			const btn = replRef.current.children[0].children[1].children[2];
			btn.classList.add('invisible');
		}, 3000);
	}, []);
	return (
		<div>
			<div id='output' className='invisible h-0'></div>
			<py-repl ref={replRef} output='output'>
				{children}
			</py-repl>
			<div
				ref={terminalDivRef}
				className={`relative ${show && 'h-40 overflow-y-hidden'}`}>
				<button
					className='z-10 absolute flex items-center gap-1 right-2 top-2 bg-black pl-2 text-white hover:text-green-400 active:text-green-600'
					onClick={() => {
						const btn = replRef.current.children[0].children[1].children[2];
						terminalRef.current.children[0].innerText = '';
						btn.click();
						setResult(terminalRef.current.children[0].innerText);
					}}>
					RUN <VscRunAll />
				</button>
				<button
					className='z-10 absolute flex items-center gap-1 right-2 top-9 bg-black pl-2 text-white hover:text-red-400 active:text-red-600'
					onClick={() => {
						terminalRef.current.children[0].innerText = '';
					}}>
					CLEAR <ImBin />
				</button>
				<button
					className='z-10 absolute flex items-center gap-1 right-2 top-16 bg-black pl-2 text-white hover:text-sky-400 active:text-sky-600'
					onClick={() => {
						setShow((show) => !show);
					}}>
					{show ? 'SHOW' : 'HIDE'} <GoPlus className={show || 'rotate-45'} />
				</button>

				<py-terminal ref={terminalRef}></py-terminal>
				{show && (
					<div className='absolute bottom-0 h-full w-full bg-gradient-to-t from-black to-transparent' />
				)}
			</div>
		</div>
	);
};

export default PythonCompilerText;
