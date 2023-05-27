import classNames from 'classnames';
import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useMaturaPath } from '../../redux/slices/path.ts';
import { VscRunAll } from 'react-icons/vsc';
import { GoPlus } from 'react-icons/go';
import { ImBin, ImCloudDownload, ImPlay3 } from 'react-icons/im';
import { updateAnsw, useTestContext } from '../../context/testContext.tsx';

const PythonCompilerText = ({ setResult, syncFunc, children, disabled }) => {
	const maturaPath = useMaturaPath();
	const dispatch = useDispatch();
	const { taskNum } = useTestContext();
	const [localDisable, setLocalDisable] = useState(true);
	const [show, setShow] = useState(true);
	const terminalRef = useRef();
	const replRef = useRef();
	const terminalDivRef = useRef();
	const runBtn = useRef();
	const loaderDiv = useRef();

	return (
		<div>
			<div id='output' className='invisible h-0'></div>
			<div className='relative'>
				<div
					tabIndex={0}
					onClick={() => {
						setLocalDisable(false);
						setTimeout(() => {
							syncFunc(replRef);
						}, 1);
						setTimeout(() => {
							const btn = replRef.current.children[0].children[1].children[2];
							btn.click();
							btn.classList.add('invisible');
							terminalRef.current.children[0].innerText = '';
							loaderDiv.current.remove();
						}, 2);
					}}
					ref={loaderDiv}
					className='absolute bg-neutral-700 opacity-70 z-10 w-full h-full flex items-center justify-center hover:cursor-pointer'>
					<div className='animate-pulse flex flex-col items-center'>
						<ImPlay3 className='text-6xl' />
						<center>ROZPOCZNIJ</center>
					</div>
				</div>
				<py-repl ref={replRef} output='output'>
					{children}
				</py-repl>
			</div>
			<div
				ref={terminalDivRef}
				className={`relative ${show && 'h-40 overflow-y-hidden'}`}>
				<button
					ref={runBtn}
					disabled={disabled || localDisable}
					className={classNames(
						'z-10 absolute flex items-center gap-1 right-2 top-2 bg-black pl-2 text-white',
						{
							'hover:text-green-400 active:text-green-600': !(
								disabled || localDisable
							),
							'text-neutral-600': disabled || localDisable,
							invisible: !show,
						}
					)}
					onClick={() => {
						const replContent =
							replRef.current.children[0].children[1].children[0].children[1]
								.children[1].innerHTML;
						const btn = replRef.current.children[0].children[1].children[2];
						terminalRef.current.children[0].innerText = '';
						btn.click();
						setResult(terminalRef.current.children[0].innerText, replContent);
						updateAnsw(dispatch, {
							answers: {
								[taskNum]: replContent,
							},
							formula: maturaPath.formula,
							date: maturaPath.date,
						});
					}}>
					WYKONAJ <VscRunAll />
				</button>
				<button
					disabled={disabled || localDisable}
					className={classNames(
						'z-10 absolute flex items-center gap-1 right-2 top-9 bg-black pl-2 text-white invisible',
						{
							'hover:text-red-400 active:text-red-600': !(
								disabled || localDisable
							),
							'text-neutral-600': disabled || localDisable,
							invisible: !show,
						}
					)}
					onClick={() => {
						terminalRef.current.children[0].innerText = '';
					}}>
					WYCZYŚĆ <ImBin />
				</button>
				<button
					disabled={disabled || localDisable}
					className={classNames(
						'z-10 absolute flex items-center gap-1 right-2 bottom-6 bg-black pl-2 text-white',
						{
							'hover:text-sky-400 active:text-sky-600': !(
								disabled || localDisable
							),
							'text-neutral-600': disabled || localDisable,
						}
					)}
					onClick={() => {
						setShow((show) => !show);
					}}>
					{show ? 'ROZWIŃ WYNIKI' : 'UKRYJ WYNIKI'}{' '}
					<GoPlus className={show || 'rotate-45'} />
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
