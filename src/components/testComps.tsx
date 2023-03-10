import React, { useEffect, useState, memo } from 'react';
import { TiTick, TiTimes } from 'react-icons/ti';
import { usePathElements } from '../redux/slices/path';

interface btnProps {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}
interface testProps {
	show: boolean;
	answer: string;
}
interface radioProps {
	show: boolean;
	positive?: boolean;
}

const AnswerBtn: React.FC<btnProps> = ({ show, setShow }) => {
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
				}}>
				SPRAWDŹ ODPOWIEDZI
			</button>
		);
};

const TestInput: React.FC<testProps> = ({ answer, show }) => {
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
					onChange={(e) => setValue(e.target.value)}
				/>
			)}
		</div>
	);
};

const TestRadio: React.FC<radioProps> = ({ positive = false, show }) => {
	const [checked, setChecked] = useState(false);
	const color = checked == positive ? 'text-green-500' : 'text-red-500';
	return show ? (
		<div className='flex items-center justify-center'>
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
		<div className='flex items-center justify-center'>
			<label className='swap'>
				<input
					type='checkbox'
					className='border-0'
					checked={checked}
					onChange={() => setChecked((v) => !v)}
				/>
				<div className='swap-on flex items-center justify-center gap-2'>
					Prawda
					<TiTick />
				</div>
				<div className='swap-off flex items-center justify-center gap-2'>
					Fałsz
					<TiTimes />
				</div>
			</label>
		</div>
	);
};

export { AnswerBtn, TestRadio, TestInput };
