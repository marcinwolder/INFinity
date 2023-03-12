import _ from 'lodash';
import React from 'react';
import { createContext, useContext, useState, useEffect } from 'react';
import { TiTick, TiTimes } from 'react-icons/ti';
import { useDispatch, useSelector } from 'react-redux';
import PythonCompilerText from '../components/PythonCompiler/PythonCompilerText';
import { Store } from '../redux';
import { answearSlice } from '../redux/slices/answers';
import { Formula, usePathElements } from '../redux/slices/path';

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

interface props {
	taskNum: number;
	title?: string;
	pkt?: number;
	show?: boolean;
}

export const TestProvider: React.FC<React.PropsWithChildren<props>> = ({
	taskNum,
	title = '',
	pkt = 0,
	children,
}) => {
	const path = [...usePathElements()].map((el) => el.replace('/', ''));
	path.shift();

	//Importing existing answers from redux
	let startingAnswers = {};
	const answers = useSelector((state: Store) => state.answers);
	const correctTest = answers.find(
		(el) => el.formula === path[0] && el.date === path[1]
	);
	if (correctTest && correctTest.answers[taskNum]) {
		startingAnswers = correctTest.answers[taskNum];
	}

	const [show, setShow] = useState(false);
	const [values, setValues] = useState(startingAnswers);

	return (
		<div className='p-3 bg-white rounded-lg my-7 shadow-md shadow-neutral-500'>
			<h1 className='bg-2015 text-black font-bold pl-1'>
				Zadanie {taskNum}
				{title.length > 1 && `. ${title}`}
				{pkt > 0 && `. (0-${pkt})`}
			</h1>
			<div className='text-black'>
				<context.Provider value={{ show, setShow, values, setValues, taskNum }}>
					{children}
				</context.Provider>
			</div>
		</div>
	);
};

interface TaskId {
	num: number;
}
interface testProps {
	answer: string;
}
interface radioProps {
	positive?: boolean;
}

export const AnswerBtn: React.FC = () => {
	const dispatch = useDispatch();
	const path = [...usePathElements()].map((el) => el.replace('/', ''));
	path.shift();

	const { show, setShow, values, taskNum } = useContext(context);
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
					dispatch(
						answearSlice.actions.changeAns({
							answers: { [taskNum]: values },
							formula: path[0] as Formula,
							date: path[1],
						})
					);
				}}>
				SPRAWDŹ ODPOWIEDZI
			</button>
		);
};

export const TestInput: React.FC<testProps & TaskId> = ({ answer, num }) => {
	const { show, setValues, values } = useContext(context);
	const value = values[num] as string | number;
	return (
		<div className='w-20 mx-auto rounded-md'>
			{show ? (
				<div className='py-0.5 w-full flex gap-2 items-center justify-center'>
					{value || '--'}
					{value === answer ? (
						<TiTick className='text-green-500 text-xl' />
					) : (
						<TiTimes className='text-red-500 text-xl' />
					)}
				</div>
			) : (
				<input
					className='px-2 w-full input input-ghost input-xs'
					type='text'
					placeholder='odp.:'
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
	const { show, setValues, values } = useContext(context);
	const checked = values[num] === true;
	const color = checked == positive ? 'text-green-500' : 'text-red-500';
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

export const TestPythonText: React.FC<
	React.PropsWithChildren<TaskId & { answer: string }>
> = ({ children, num, answer }) => {
	const { show, setValues, values } = useContext(context);
	return (
		<PythonCompilerText
			syncFunc={(replRef) => {
				const eoooooo =
					replRef.current.children[0].children[1].children[0].children[1]
						.children[1];
				eoooooo.innerHTML = values[num] as string;
			}}
			setResult={(result, repl) => {
				if (repl === '') {
					setValues((v) => _.omit(v, num));
				} else setValues((v) => ({ ...v, [num]: repl }));
				console.log(result.toString() === answer);
			}}>
			{children}
		</PythonCompilerText>
	);
};
