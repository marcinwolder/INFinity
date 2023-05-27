import classNames from 'classnames';
import {
	useState,
	useRef,
	MutableRefObject,
	FC,
	PropsWithChildren,
} from 'react';
import { useDispatch } from 'react-redux';
import { useMaturaPath } from '../../redux/slices/path';
import { VscRunAll } from 'react-icons/vsc';
import { GoPlus } from 'react-icons/go';
import { ImBin, ImPlay3 } from 'react-icons/im';
import { updateAnswer, useTestContext } from '../../context/testContext';
import PyRepl from './PyRepl';
import PyTerminal from './PyTerminal';

interface PythonCompilerTextProps {
	setResult: (result: string, repl: string) => void;
	syncFunc: (replRef: MutableRefObject<any>) => void;
	disabled: boolean;
}

const PythonCompilerText: FC<PropsWithChildren<PythonCompilerTextProps>> = ({
	setResult,
	syncFunc,
	children,
	disabled,
}) => {
	const [localDisabled, setLocalDisabled] = useState(true);
	const [show, setShow] = useState(true);

	const dispatch = useDispatch();

	const { taskNum } = useTestContext();
	const maturaPath = useMaturaPath();

	const terminalRef = useRef<any>();
	const replRef = useRef<any>();

	const runBtn = useRef<HTMLButtonElement>(null);
	const terminalDivRef = useRef<HTMLDivElement>(null);
	const loaderDiv = useRef<HTMLDivElement>(null);

	return (
		<div>
			<div id='output' className='invisible h-0'></div>
			<div className='relative'>
				<div
					tabIndex={0}
					onClick={() => {
						setLocalDisabled(false);
						setTimeout(() => {
							syncFunc(replRef);
						}, 1);
						setTimeout(() => {
							const runBtn =
								replRef.current.children[0].children[1].children[2];
							runBtn.click();
							runBtn.classList.add('invisible');

							terminalRef.current.children[0].innerText = '';
							loaderDiv.current?.remove();
						}, 2);
					}}
					ref={loaderDiv}
					className='absolute bg-neutral-700 opacity-70 z-10 w-full h-full flex items-center justify-center hover:cursor-pointer'>
					<div className='animate-pulse flex flex-col items-center'>
						<ImPlay3 className='text-6xl' />
						<center>ROZPOCZNIJ</center>
					</div>
				</div>
				<PyRepl ref={replRef} output='output'>
					{children}
				</PyRepl>
			</div>
			<div
				ref={terminalDivRef}
				className={`relative ${show && 'h-40 overflow-y-hidden'}`}>
				<button
					ref={runBtn}
					disabled={disabled || localDisabled}
					className={classNames(
						'z-10 absolute flex items-center gap-1 right-2 top-2 bg-black pl-2 text-white',
						{
							'hover:text-green-400 active:text-green-600': !(
								disabled || localDisabled
							),
							'text-neutral-600': disabled || localDisabled,
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
						updateAnswer(dispatch, {
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
					disabled={disabled || localDisabled}
					className={classNames(
						'z-10 absolute flex items-center gap-1 right-2 top-9 bg-black pl-2 text-white invisible',
						{
							'hover:text-red-400 active:text-red-600': !(
								disabled || localDisabled
							),
							'text-neutral-600': disabled || localDisabled,
							invisible: !show,
						}
					)}
					onClick={() => {
						terminalRef.current.children[0].innerText = '';
					}}>
					WYCZYŚĆ <ImBin />
				</button>
				<button
					disabled={disabled || localDisabled}
					className={classNames(
						'z-10 absolute flex items-center gap-1 right-2 bottom-6 bg-black pl-2 text-white',
						{
							'hover:text-sky-400 active:text-sky-600': !(
								disabled || localDisabled
							),
							'text-neutral-600': disabled || localDisabled,
						}
					)}
					onClick={() => {
						setShow((show) => !show);
					}}>
					{show ? 'ROZWIŃ WYNIKI' : 'UKRYJ WYNIKI'}{' '}
					<GoPlus className={classNames({ 'rotate-45': show })} />
				</button>

				<PyTerminal ref={terminalRef}></PyTerminal>
				{show && (
					<div className='absolute bottom-0 h-full w-full bg-gradient-to-t from-black to-transparent' />
				)}
			</div>
		</div>
	);
};

export default PythonCompilerText;
