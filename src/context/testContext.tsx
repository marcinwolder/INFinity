import _ from 'lodash';
import React, { FC, MutableRefObject, PropsWithChildren } from 'react';
import { createContext, useContext, useState } from 'react';
import { TiTick, TiTimes } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import PythonCompilerText from '../components/PythonCompiler/PythonCompilerText';
import { StateStore } from '../redux';
import { Matura, answerSlice } from '../redux/slices/answers';
import { useMaturaPath } from '../redux/slices/path';
import { AnyAction, Dispatch } from '@reduxjs/toolkit';
import classNames from 'classnames';

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

interface TestPythonTextProps {
	tests: { input: any; output: any }[];
	dane: string[];
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

export const TestPythonText: React.FC<TaskId & TestPythonTextProps> = ({
	num,
	tests,
	dane,
}) => {
	const maturaPath = useMaturaPath();
	const { show, setValues, values } = useTestContext();
	const [result, setResult] = useState(false);

	const funcName = `algo${maturaPath.date.replace('/', '')}${num}`;

	return (
		<>
			<PythonCompilerText
				terminal
				disabled={show}
				syncFunc={(setReplSrc) => {
					if (values[num]) {
						if (typeof values === 'string') {
							setReplSrc(values);
						} else {
							setReplSrc(values[num] as string);
						}
					}
				}}
				setResult={(repl: string) => {
					if (repl === '') {
						setValues((v) => _.omit(v, num));
					} else setValues((v) => ({ ...v, [num]: repl }));
					const func = pyscript.interpreter.globals.get(funcName) as Function;
					let afterTest = true;
					tests.forEach(({ input, output }) => {
						if (typeof input === 'object') {
							console.log(func(...input), output);
							if (func(...input) !== output) afterTest = false;
						} else {
							console.log(func(...input), output);
							if (func(input) !== output) afterTest = false;
						}
					});
					setResult(afterTest);
				}}>
				{`def ${funcName}(${dane.join(', ')}):\n    return 0`}
			</PythonCompilerText>
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
