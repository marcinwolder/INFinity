import classNames from 'classnames';
import { useState, useRef, MutableRefObject, useCallback, useId } from 'react';
import { useDispatch } from 'react-redux';
import { useClipboard } from '@mantine/hooks';

import { VscRunAll } from 'react-icons/vsc';
import { GoPlus } from 'react-icons/go';
import { ImBin, ImPlay3 } from 'react-icons/im';
import { AiOutlineCopy, AiFillCopy } from 'react-icons/ai';

import { useMaturaPath } from '../../redux/slices/path';
import { updateAnswer, useTestContext } from '../../context/testContext';
import usePyRepl from './usePyRepl';
import PyTerminal from './PyTerminal';

interface PythonCompilerTextProps {
	setResult: (result: string, repl: string) => void; //func used to pass algo result to context
	syncFunc: (setReplSrc: (newSrc: string) => void) => void; //func used to get previous answers from context
	disabled: boolean; //boolean from answer button
	terminal?: boolean; //decides if terminal is shown or hidden
}

const PythonCompilerText: React.FC<
	React.PropsWithChildren<PythonCompilerTextProps>
> = ({ setResult, syncFunc, children, disabled, terminal }) => {
	const [PyRepl, setReplSrc] = usePyRepl();

	const [localDisabled, setLocalDisabled] = useState(true); //disable usage of buttons
	const [show, setShow] = useState(true); //show whole terminal output

	const dispatch = useDispatch();

	const { taskNum } = useTestContext();
	const maturaPath = useMaturaPath();

	// const terminalId = `${maturaPath.date}-${maturaPath.formula}-${taskNum}`;
	const terminalId = 'TEST';
	const terminalRef = useRef<any>();
	const replRef = useRef<any>();
	const runBtn = useRef<HTMLButtonElement>(null);
	const terminalDivRef = useRef<HTMLDivElement>(null);
	const loaderDiv = useRef<HTMLDivElement>(null);

	const clipboard = useClipboard();

	const startClick = useCallback(() => {
		setLocalDisabled(false);
		setTimeout(() => {
			syncFunc(setReplSrc);
		}, 1);
		setTimeout(() => {
			const runBtn = replRef.current.children[0].children[0].children[1];
			runBtn.click();

			loaderDiv.current?.remove();
		}, 2);
	}, [loaderDiv, runBtn]);
	const copyClick = () => {
		const code = replRef.current.getPyScr();
		clipboard.copy(code);
	};
	const algoStartClick = () => {
		const replContent = replRef.current.getPySrc();
		const btn = replRef.current.children[0].children[0].children[1];
		btn.click();
		setResult(terminalRef.current.children[0].innerText, replContent);
		updateAnswer(dispatch, {
			answers: {
				[taskNum]: replContent,
			},
			formula: maturaPath.formula,
			date: maturaPath.date,
		});
	};
	const runClick = () => {
		const replContent = replRef.current.getPySrc();
		const btn = replRef.current.children[0].children[0].children[1];
		btn.click();
		setResult(terminalRef.current.children[0].innerText, replContent);
		updateAnswer(dispatch, {
			answers: {
				[taskNum]: replContent,
			},
			formula: maturaPath.formula,
			date: maturaPath.date,
		});
		setReplSrc(replContent);
	};
	const showClick = () => {
		setShow((show) => !show);
	};

	return (
		<div>
			<div className='relative'>
				<div
					tabIndex={0}
					onClick={startClick}
					ref={loaderDiv}
					className='absolute bg-neutral-700 opacity-70 z-10 w-full h-full flex items-center justify-center hover:cursor-pointer'>
					<div className='animate-pulse flex items-center'>
						<ImPlay3 className='text-4xl' />
						<center>ROZPOCZNIJ</center>
					</div>
				</div>
				<div className='relative'>
					<PyRepl output={terminalId} ref={replRef}>
						{children}
					</PyRepl>
				</div>
			</div>

			<div
				className={`flex flex-col items-center my-2 ${
					terminal ? 'hidden' : 'block'
				}`}>
				<button
					disabled={disabled || localDisabled}
					className={classNames(
						'z-10 flex items-center gap-1 pl-2 text-black',
						{
							'hover:text-green-400 active:text-green-600': !(
								disabled || localDisabled
							),
							'text-neutral-600': disabled || localDisabled,
							invisible: !show,
						}
					)}
					onClick={algoStartClick}>
					URUCHOM ALGORYTM <VscRunAll />
				</button>
				<i>
					<sup>*</sup>kliknij przed sprawdzeniem poprawności odpowiedzi
				</i>
			</div>

			<div
				ref={terminalDivRef}
				className={classNames('relative', {
					'h-40 overflow-y-hidden': show,
					block: terminal,
					hidden: !terminal,
				})}>
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
					onClick={runClick}>
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
						// terminalRef.current.children[0].innerText = '';
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
					onClick={showClick}>
					{show ? 'ROZWIŃ WYNIKI' : 'UKRYJ WYNIKI'}{' '}
					<GoPlus className={classNames({ 'rotate-45': show })} />
				</button>

				<PyTerminal ref={terminalRef} id={terminalId}></PyTerminal>
				{show && (
					<div className='absolute bottom-0 h-full w-full bg-gradient-to-t from-black to-transparent' />
				)}
			</div>
		</div>
	);
};

export default PythonCompilerText;
