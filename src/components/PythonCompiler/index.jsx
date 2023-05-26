import classNames from 'classnames';
import { useState, useRef, useEffect } from 'react';
import { VscRunAll } from 'react-icons/vsc';
import { GoPlus } from 'react-icons/go';
import { ImBin, ImCloudDownload } from 'react-icons/im';
import { BiLoaderAlt } from 'react-icons/bi';

const PythonCompiler = ({ setResult, syncFunc, disabled }) => {
	const [show, setShow] = useState(true);
	const terminalRef = useRef();
	const replRef = useRef();
	const terminalDivRef = useRef();
	const syncBtn = useRef();
	const runBtn = useRef();
	const loaderDiv = useRef();
	useEffect(() => {
		document.activeElement?.blur && document.activeElement.blur();
		setTimeout(() => {
			const btn = replRef.current.children[0].children[1].children[2];
			btn.classList.add('invisible');
			syncBtn.current.click();
			runBtn.current.click();
			loaderDiv.current.remove();
			document.activeElement?.blur && document.activeElement.blur();
		}, 3000);
	}, []);
	return (
		<div>
			<div id='output' className='invisible h-0'></div>
			<div className='relative'>
				<div
					ref={loaderDiv}
					className='absolute bg-neutral-700 opacity-70 z-10 w-full h-full flex items-center justify-center'>
					<BiLoaderAlt className='text-6xl animate-spin' />
				</div>
				<py-repl ref={replRef} output='output'>
					{`
            with open("${dataPath}") as file:
                data = list(map(lambda x: str(x).strip(), file.readlines()))
            # YOUR ${testPath ? 'REAL ' : ''}DATA IS IN [data] LIST
            ${
							testPath
								? `with open("${testPath}") as file:
                test = list(map(lambda x: str(x).strip(), file.readlines()))
            # AND YOUR TEST DATA IS IN [test] LIST
            `
								: ''
						}
            for line in data:
                print(line)
            `}
				</py-repl>
			</div>
			<div
				ref={terminalDivRef}
				className={`relative ${show && 'h-40 overflow-y-hidden'}`}>
				<button
					ref={runBtn}
					disabled={disabled}
					className={classNames(
						'z-10 absolute flex items-center gap-1 right-2 top-2 bg-black pl-2 text-white',
						{ 'hover:text-green-400 active:text-green-600': !disabled },
						{ 'text-neutral-500': disabled }
					)}
					onClick={() => {
						const replContent =
							replRef.current.children[0].children[1].children[0].children[1]
								.children[1].innerHTML;
						const btn = replRef.current.children[0].children[1].children[2];
						terminalRef.current.children[0].innerText = '';
						btn.click();
						setResult(
							terminalRef.current.children[0].innerText,
							replContent,
							replRef
						);
					}}>
					RUN <VscRunAll />
				</button>
				<button
					disabled={disabled}
					className={classNames(
						'z-10 absolute flex items-center gap-1 right-2 top-9 bg-black pl-2 text-white',
						{ 'hover:text-red-400 active:text-red-600': !disabled },
						{ 'text-neutral-500': disabled }
					)}
					onClick={() => {
						terminalRef.current.children[0].innerText = '';
					}}>
					CLEAR <ImBin />
				</button>
				<button
					ref={syncBtn}
					disabled={disabled}
					className={classNames(
						'z-10 absolute flex items-center gap-1 right-2 top-16 bg-black pl-2 text-white',
						{ 'hover:text-yellow-600 active:text-yellow-800': !disabled },
						{ 'text-neutral-500': disabled }
					)}
					onClick={() => syncFunc(replRef)}>
					SYNC CODE <ImCloudDownload />
				</button>
				<button
					disabled={disabled}
					className={classNames(
						'z-10 absolute flex items-center gap-1 right-2 bottom-2 bg-black pl-2 text-white',
						{ 'hover:text-sky-400 active:text-sky-600': !disabled },
						{ 'text-neutral-500': disabled }
					)}
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

export default PythonCompiler;
