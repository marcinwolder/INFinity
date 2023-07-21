/* eslint-disable react-refresh/only-export-components */
import _ from 'lodash';
import React, { FC, PropsWithChildren, useRef } from 'react';
import { createContext, useContext, useState } from 'react';
import { TiTick, TiTimes } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import { StateStore } from '../redux';
import { Matura, answerSlice } from '../redux/slices/answersSlice';
import { useMaturaPath } from '../redux/slices/pathSlice';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import classNames from 'classnames';
import usePyRepl from '../components/PythonCompiler/usePyRepl';
import { ImPlay3 } from 'react-icons/im';
import { VscRunAll } from 'react-icons/vsc';
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
	showOnDefault?: boolean;
	taskNum: number;
	title?: string;
	pkt?: number;
	show?: boolean;
}
interface TaskId {
	num: number;
}
interface testProps {
	answer: number | string | ((ans: string) => boolean);
	placeholder?: string;
}
interface radioProps {
	positive?: boolean;
}

const context = createContext<Context>({
	show: false,
	setShow: () => {
		return;
	},
	values: {},
	setValues: () => {
		return;
	},
	taskNum: 0,
});

const useTestContext = () => {
	return useContext(context);
};

const updateAnswer = (dispatch: Dispatch<AnyAction>, dane: Matura) => {
	dispatch(answerSlice.actions.changeAns(dane));
};

export const TestImg: React.FC<{ img: string; className?: string }> = ({
	img,
	className,
}) => {
	return (
		<img
			src={img}
			draggable={false}
			className={'pt-2 select-none ' + className}
		/>
	);
};

export const InfoBox: React.FC<
	React.PropsWithChildren<{ taskNums: string[] }>
> = ({ taskNums, children }) => {
	return (
		<div className='p-3 bg-white rounded-lg my-7 shadow-md shadow-neutral-500 select-none'>
			<h1 className={'font-bold pl-2 text-md rounded bg-black text-white'}>
				{`Informacje do zada${
					taskNums.length > 1 ? 'ń' : 'nia'
				} ${taskNums.join(', ')}.`}
			</h1>
			<div className='text-black px-1'>{children}</div>
		</div>
	);
};

export const TestProvider: FC<PropsWithChildren<TestProviderProps>> = ({
	taskNum,
	title = '',
	pkt = 0,
	children,
	showOnDefault,
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

	const [show, setShow] = useState(showOnDefault || false);
	const [values, setValues] = useState(startingAnswers);

	return (
		<div className='p-3 bg-white rounded-lg my-7 shadow-md shadow-neutral-500 select-none'>
			<h1
				className={classNames('text-black font-bold pl-2 text-md rounded', {
					'bg-stara': maturaPath.formula === 'formula-stara',
					'bg-2015': maturaPath.formula === 'formula-2015',
					'bg-2023': maturaPath.formula === 'formula-2023',
				})}>
				{'Zadanie '}
				{taskNum}
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

export const TestInput: React.FC<testProps & TaskId> = ({
	answer,
	num,
	placeholder,
}) => {
	const { show, setValues, values } = useTestContext();
	const value = values[num] as string;
	let compare;
	if (typeof answer === 'string') compare = (str: string) => str === answer;
	else if (typeof answer === 'number')
		compare = (str: string) => Number(str) === answer;
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
					placeholder={placeholder || '________'}
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

export const TestArea: React.FC<testProps & TaskId> = ({
	answer,
	num,
	placeholder,
}) => {
	const { show, setValues, values } = useTestContext();
	const value = values[num] as string;
	let compare;
	if (typeof answer === 'string')
		compare = (str: string) => str.trim() === answer;
	else if (typeof answer === 'number')
		compare = (str: string) => Number(str) === answer;
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
				<textarea
					className='px-2 py-0 w-full bg-white border border-black h-36'
					placeholder={placeholder || ''}
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

type ReplElement = HTMLDivElement & { getPySrc: () => string };
// prettier-ignore
type Test = {input: string | number | boolean | Array<string | number | boolean | Array<string | number | boolean>>; output: string | number | boolean | Array<string | number | boolean>;}[] | string[]
interface PythonCompilerProps {
	tests: Test; //set of test that will check if algo is working
	parameters?: string[]; //parameters used in prepared func or print func (when with terminal)
	terminal?: boolean; //determines if terminal should be visible or not
	dataPath?: string; //data file path
	testPath?: string; //test data file path
}

export const TestPython: React.FC<
	React.PropsWithChildren<TaskId & PythonCompilerProps>
> = ({ children, num, tests, parameters, terminal, dataPath, testPath }) => {
	const [PyRepl, setReplSrc] = usePyRepl();
	const { show, taskNum, setValues, values } = useTestContext();
	const dispatch = useDispatch();
	const maturaPath = useMaturaPath();

	const terminalId = useId();
	const terminalRef = useRef<HTMLDivElement>(null);
	const replRef = useRef<ReplElement>(null);
	const runBtn = useRef<HTMLButtonElement>(null);

	const [result, setResult] = useState(false);
	const [disabled, setDisabled] = useState(true);

	const funcName = `algo${maturaPath.date.replace('/', '')}${num}`;

	const getStartBtn = () =>
		replRef.current?.children[0].children[0].children[1] as HTMLButtonElement;

	const resultCheck = (terminalContent: string) => {
		if (terminalContent === '') {
			setValues((v) => _.omit(v, num));
		} else setValues((v) => ({ ...v, [num]: terminalContent }));

		const func = pyscript.interpreter.globals.get(funcName) as (
			...args: unknown[]
		) => unknown;

		let afterTest = true;

		tests.forEach((test) => {
			if (typeof test === 'string') {
				afterTest = false;
				if (terminalContent.trim() === test.trim()) {
					afterTest = true;
				}
			} else {
				const { input, output } = test;
				if (typeof input === 'object') {
					if (func(...input) !== output) afterTest = false;
				} else {
					if (func(input) !== output) afterTest = false;
				}
			}
		});
		setResult(afterTest);
	};
	const startClick = () => {
		setDisabled(false);
		if (values[num]) {
			if (typeof values === 'string') {
				setReplSrc(values);
			} else {
				setReplSrc(values[num] as string);
			}
		}
		getStartBtn().click();
	};
	const runClick = () => {
		const replContent = replRef.current?.getPySrc() || '';
		if (terminalRef.current) {
			getStartBtn().click();
			terminalRef.current.innerText = '';
			setTimeout(() => {
				if (terminalRef.current) {
					resultCheck(terminalRef.current.innerText);
				}
			}, 1);
		}
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
				<p
					className={classNames('font-semibold text-sm text-center mb-2', {
						hidden: terminal,
					})}>
					(rozwiązanie zadania zapisz w podanej funkcji)
				</p>
				<div className='relative'>
					<div
						tabIndex={0}
						onClick={startClick}
						className={classNames(
							'absolute bg-neutral-700 opacity-70 z-10 w-full h-full flex items-center justify-center hover:cursor-pointer',
							{ hidden: !disabled }
						)}>
						<div className='animate-pulse flex items-center'>
							<ImPlay3 className='text-4xl' />
							<center>ROZPOCZNIJ</center>
						</div>
					</div>
					<div className='relative'>
						<PyRepl output={terminalId} ref={replRef}>
							{(() => {
								if (children) return children;
								if (terminal) {
									let output = '';
									if (dataPath) {
										output += `# DANE PRAWDZIWE SĄ DOSTĘPNE W: ${dataPath}\n`;
									}
									if (testPath) {
										output += `# DANE PRZYKŁADOWE SĄ DOSTĘPNE W: ${testPath}\n`;
									}
									if (parameters) {
										output += `# ODPOWIEDŹ WYPISZ W PODANYM FORMACIE:\n ${parameters
											.map((el) => `#print(${el})`)
											.join('\n ')}`;
									}
									return output;
								}
								if (parameters)
									return `def ${funcName}(${
										parameters ? parameters.join(', ') : ''
									}):\n    return 0`;
							})()}
						</PyRepl>
					</div>
				</div>
				<div
					className={classNames(`flex flex-col items-center my-2`, {
						hidden: terminal,
					})}>
					<button
						disabled={disabled}
						className={classNames(
							'z-10 flex items-center gap-1 pl-2 text-black hover:text-green-400 active:text-green-600',
							{
								'hover:text-gray-600 active:text-gray-600 text-gray-600':
									disabled,
							}
						)}
						onClick={runClick}>
						URUCHOM ALGORYTM <VscRunAll />
					</button>
					<i>
						<sup>*</sup>kliknij przed sprawdzeniem poprawności odpowiedzi
					</i>
				</div>
				<div className={classNames('relative', { hidden: !terminal })}>
					<button
						disabled={disabled}
						ref={runBtn}
						className={classNames(
							'z-10 absolute flex items-center gap-1 right-2 top-2 bg-black pl-2 text-white hover:text-green-400 active:text-green-600',
							{
								'hover:text-gray-600 active:text-gray-600 text-gray-600':
									disabled,
							}
						)}
						onClick={runClick}>
						WYKONAJ <VscRunAll />
					</button>
					<div
						className={classNames(
							'relative bg-black w-full overflow-x-scroll'
						)}>
						<div
							className="min-h-12 w-max bg-black text-white font-['IBM Plex Mono'] px-2 py-1 leading-snug"
							ref={terminalRef}
							id={terminalId}></div>
					</div>
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
