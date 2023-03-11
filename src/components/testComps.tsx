import { createContext, useContext, useState } from 'react';
import { TiTick, TiTimes } from 'react-icons/ti';
import { useDispatch } from 'react-redux';
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
	const [show, setShow] = useState(false);
	const [values, setValues] = useState({});
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

	const { show, setShow, values } = useContext(context);
	if (show)
		return (
			<button
				className='btn btn-secondary bg-base-100'
				onClick={() => {
					setShow(false);
					console.log(values);
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
							answers: values,
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
	const { show, setValues, taskNum, values } = useContext(context);
	const [value, setValue] = useState('');
	return (
		<div className='w-20 mx-auto rounded-md'>
			{show ? (
				<div className='py-0.5 w-full flex gap-2 items-center justify-center'>
					{value || '--'}
					{value === answer ? (
						<TiTick className='text-green-500 text-xl' />
					) : (
						<>
							<TiTimes className='text-red-500 text-xl' />{' '}
							<p className='underline underline-offset-2'>({answer})</p>
						</>
					)}
				</div>
			) : (
				<input
					className='px-2 w-full input input-ghost input-xs'
					type='text'
					placeholder='odp.:'
					value={value}
					onChange={(e) => {
						setValues((v) =>
							Object.assign(v, { [taskNum]: { [num]: e.target.value } })
						);
						setValue(e.target.value);
						console.log(values);
					}}
				/>
			)}
		</div>
	);
};

export const TestRadio: React.FC<
	React.PropsWithChildren<radioProps & TaskId>
> = ({ positive = false, children }) => {
	const { show } = useContext(context);
	const [checked, setChecked] = useState(false);
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
					checked={checked}
					onChange={() => setChecked((v) => !v)}
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
