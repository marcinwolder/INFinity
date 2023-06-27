import _ from 'lodash';
import React, {
	FC,
	MutableRefObject,
	PropsWithChildren,
	useEffect,
	useRef,
} from 'react';
import { createContext, useContext, useState } from 'react';
import { TiTick, TiTimes } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { StateStore } from '../redux';
import { Matura, answerSlice } from '../redux/slices/answers';
import { useMaturaPath } from '../redux/slices/path';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import classNames from 'classnames';
import usePyRepl from '../components/PythonCompiler/usePyRepl';
import { ImBin, ImPlay3 } from 'react-icons/im';
import { VscRunAll } from 'react-icons/vsc';
import PyTerminal from '../components/PythonCompiler/PyTerminal';
import { GoPlus } from 'react-icons/go';
import { useId } from '@mantine/hooks';

export interface Answers {
	[keys: number]: string | number | boolean;
}
interface Context {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
	values: Answers;
	setValues: React.Dispatch<React.SetStateAction<Answers>>;
	taskNum: number;
}
interface TestProviderProps {
	taskNum: number;
	title?: string;
	pkt?: number;
	show?: boolean;
}
interface TaskId {
	num: number;
}
interface testProps {
	answer: string | ((ans: string) => boolean);
}
interface radioProps {
	positive?: boolean;
}

const context = createContext<Context>({
	show: false,
	setShow: () => {},
	values: {},
	setValues: () => {},
	taskNum: 0,
});

export const useTestContext = () => {
	return useContext(context);
};

export const updateAnswer = (dispatch: Dispatch<AnyAction>, dane: Matura) => {
	dispatch(answerSlice.actions.changeAns(dane));
};

export const TestProvider: FC<PropsWithChildren<TestProviderProps>> = ({
	taskNum,
	title = '',
	pkt = 0,
	children,
}) => {
	const maturaPath = useMaturaPath();

	//Importing existing answers from redux
	let startingAnswers = {};
	const answers = useSelector((state: StateStore) => state.answers);
	const correctTest = answers.find(
		(el) => el.formula === maturaPath.formula && el.date === maturaPath.date
	);
	if (correctTest && correctTest.answers[taskNum]) {
		startingAnswers = correctTest.answers[taskNum];
	}

	const [show, setShow] = useState(false);
	const [values, setValues] = useState(startingAnswers);

	return (
		<div className='p-3 bg-white rounded-lg my-7 shadow-md shadow-neutral-500 select-none'>
			<h1
				className={classNames('text-black font-bold pl-2 text-md rounded', {
					'bg-stara': maturaPath.formula === 'formula-stara',
					'bg-2015': maturaPath.formula === 'formula-2015',
					'bg-2023': maturaPath.formula === 'formula-2023',
				})}>
				Zadanie {taskNum}
				{title.length > 1 && `. ${title}`}
				{pkt > 0 && `. (0-${pkt})`}
			</h1>
			<div className='text-black px-1'>
				<context.Provider value={{ show, setShow, values, setValues, taskNum }}>
					{children}
				</context.Provider>
			</div>
		</div>
	);
};

export const _AnswerBtn: React.FC = () => {
	const dispatch = useDispatch();
	const maturaPath = useMaturaPath();

	const { show, setShow, values, taskNum } = useTestContext();
	if (show)
		return (
			<button
				className='btn btn-secondary bg-base-100'
				onClick={() => {
					setShow(false);
				}}>
				SPRÓBUJ PONOWNIE
			</button>
		);
	else
		return (
			<button
				className='btn btn-secondary'
				onClick={() => {
					setShow(true);
					updateAnswer(dispatch, {
						answers: { [taskNum]: values },
						formula: maturaPath.formula,
						date: maturaPath.date,
					});
				}}>
				SPRAWDŹ ODPOWIEDZI
			</button>
		);
};

export const AnswerBtn: React.FC = () => {
	return (
		<div className='w-full flex justify-center pt-2'>
			<_AnswerBtn />
		</div>
	);
};

export const TestInput: React.FC<testProps & TaskId> = ({ answer, num }) => {
	const { show, setValues, values } = useTestContext();
	const value = values[num] as string;
	let compare;
	if (typeof answer === 'string') compare = (str: string) => str === answer;
	else
		compare = (str: string) => {
			if (!str) return false;
			return answer(str);
		};
	return (
		<div className='w-full mx-auto rounded-md'>
			{show ? (
				<div className='w-full flex gap-2 items-center justify-center'>
					{value || '--'}
					{compare(value) ? (
						<TiTick className='text-success text-xl' />
					) : (
						<TiTimes className='text-error text-xl' />
					)}
				</div>
			) : (
				<input
					className='px-2 py-0 w-full h-5 text-center bg-white outline-none border-none'
					type='text'
					placeholder='________'
					value={value || ''}
					onChange={(e) => {
						const input = e.target.value;
						if (input === '') {
							setValues((v) => _.omit(v, num));
						} else setValues((v) => ({ ...v, [num]: input }));
					}}
				/>
			)}
		</div>
	);
};

export const TestRadio: React.FC<
	React.PropsWithChildren<radioProps & TaskId>
> = ({ positive = false, children, num }) => {
	const { show, setValues, values } = useTestContext();
	const checked = values[num] === true;
	const color = checked == positive ? 'text-success' : 'text-error';
	return show ? (
		<div className='flex gap-2 items-center justify-center'>
			{children}
			<label className='swap swap-rotate'>
				<input type='checkbox' className='border-0' checked={checked} />
				<div
					className={`swap-on flex items-center justify-center gap-2 ${color}`}>
					Prawda
					<TiTick />
				</div>
				<div
					className={`swap-off flex items-center justify-center gap-2 ${color}`}>
					Fałsz
					<TiTimes />
				</div>
			</label>
		</div>
	) : (
		<div className='flex items-center gap-2 justify-center'>
			{children}
			<label className='swap'>
				<input
					type='checkbox'
					className='border-0'
					checked={values[num] === true}
					onChange={() => {
						const input = !checked;
						if (input === false) {
							setValues((v) => _.omit(v, num));
						} else setValues((v) => ({ ...v, [num]: input }));
					}}
				/>
				<div className='swap-on flex items-center justify-center gap-2'>
					Prawda
				</div>
				<div className='swap-off flex items-center justify-center gap-2'>
					Fałsz
				</div>
			</label>
		</div>
	);
};

interface PythonCompilerProps {
	setResult: (result: string, repl: string) => void; //func used to pass algo result to context
	syncFunc: (setReplSrc: (newSrc: string) => void) => void; //func used to get previous answers from context
	disabled: boolean; //boolean from answer button
	terminal?: boolean; //decides if terminal is shown or hidden
	tests: { input: any; output: any }[] | string;
	dane: string[];
}

export const TestPython: React.FC<
	React.PropsWithChildren<TaskId & PythonCompilerProps>
> = ({ children, num, tests, dane }) => {
	const [PyRepl, setReplSrc] = usePyRepl();

	const [localDisabled, setLocalDisabled] = useState(true); //disable usage of buttons
	const [show, setShow] = useState(true); //show whole terminal output

	const dispatch = useDispatch();

	const { taskNum, setValues, values } = useTestContext();
	const maturaPath = useMaturaPath();

	const terminalId = useId();
	const terminalRef = useRef<any>();
	const replRef = useRef<any>();
	const runBtn = useRef<HTMLButtonElement>(null);
	const terminalDivRef = useRef<HTMLDivElement>(null);

	const [result, setResult] = useState(false);

	const funcName = `algo${maturaPath.date.replace('/', '')}${num}`;

	let startBtn: HTMLButtonElement;
	useEffect(() => {
		startBtn = replRef.current.children[0].children[0].children[1];
	}, [replRef.current]);

	const resultCheck = (terminalContent: string) => {
		if (terminalContent === '') {
			setValues((v) => _.omit(v, num));
		} else setValues((v) => ({ ...v, [num]: terminalContent }));
		const func = pyscript.interpreter.globals.get(funcName) as Function;
		let afterTest = true;
		if (typeof tests === 'string') {
			afterTest = terminalContent === tests ? true : false;
		} else {
			tests.forEach(({ input, output }) => {
				if (typeof input === 'object') {
					console.log(func(...input), output);
					if (func(...input) !== output) afterTest = false;
				} else {
					console.log(func(...input), output);
					if (func(input) !== output) afterTest = false;
				}
			});
		}
		setResult(afterTest);
	};
	const startClick = () => {
		setLocalDisabled(false);
		if (values[num]) {
			if (typeof values === 'string') {
				setReplSrc(values);
			} else {
				setReplSrc(values[num] as string);
			}
		}
		startBtn.click();
	};
	const runClick = () => {
		const replContent = replRef.current.getPySrc();
		startBtn.click();
		resultCheck(terminalRef.current.children[0].innerText);
		updateAnswer(dispatch, {
			answers: {
				[taskNum]: replContent,
			},
			formula: maturaPath.formula,
			date: maturaPath.date,
		});
		setReplSrc(replContent);
	};

	return (
		<>
			<div>
				<div className='relative'>
					<div
						tabIndex={0}
						onClick={startClick}
						className={classNames(
							'absolute bg-neutral-700 opacity-70 z-10 w-full h-full flex items-center justify-center hover:cursor-pointer',
							{ hidden: !localDisabled }
						)}>
						<div className='animate-pulse flex items-center'>
							<ImPlay3 className='text-4xl' />
							<center>ROZPOCZNIJ</center>
						</div>
					</div>
					<div className='relative'>
						<PyRepl output={terminalId} ref={replRef}>
							{children || `def ${funcName}(${dane.join(', ')}):\n    return 0`}
						</PyRepl>
					</div>
				</div>
				{/* <div className={`flex flex-col items-center my-2 $`}>
					<button
						className={classNames(
							'z-10 flex items-center gap-1 pl-2 text-black',
							{
								'hover:text-green-400 active:text-green-600': !true,
								'text-neutral-600': true,
								invisible: !show,
							}
						)}
						onClick={runClick}>
						URUCHOM ALGORYTM <VscRunAll />
					</button>
					<i>
						<sup>*</sup>kliknij przed sprawdzeniem poprawności odpowiedzi
					</i>
				</div> */}
				<div
					ref={terminalDivRef}
					className={classNames('relative', {
						'h-40 overflow-y-hidden': show,
						block: true,
						hidden: !true,
					})}>
					<button
						ref={runBtn}
						// disabled={disabled || localDisabled}
						className={classNames(
							'z-10 absolute flex items-center gap-1 right-2 top-2 bg-black pl-2 text-white',
							{
								'hover:text-green-400 active:text-green-600': !true,
								'text-neutral-600': true,
								invisible: !show,
							}
						)}
						onClick={runClick}>
						WYKONAJ <VscRunAll />
					</button>
					<PyTerminal ref={terminalRef} id={terminalId}></PyTerminal>
					{show && (
						<div className='absolute bottom-0 h-full w-full bg-gradient-to-t from-black to-transparent' />
					)}
				</div>
			</div>
			{show && (
				<div className='mx-auto w-56 text-center my-2'>
					{result ? (
						<div className='bg-success text-success-content p-2 rounded'>
							{'Odpowiedź '}
							<u>POPRAWNA!</u>
						</div>
					) : (
						<div className='bg-error text-error-content p-2 rounded'>
							{'Odpowiedź '}
							<u>NIEPOPRAWNA!</u>
						</div>
					)}
				</div>
			)}
		</>
	);
};
