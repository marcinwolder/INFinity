import React, { useEffect, useState, memo } from 'react';
import { TiTick, TiTimes } from 'react-icons/ti';

interface testProps {
	answer: string;
}
interface radioProps {
	positive?: boolean;
}

const useTest = () => {
	const [show, setShow] = useState(false);
	const AnswerBtn: React.FC = () => {
		if (show)
			return (
				<button className='btn btn-secondary btn-disabled bg-base-100'>
					SPRAWDŹ ODPOWIEDZI
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

	const Input: React.FC<testProps> = memo(({ answer }) => {
		const [value, setValue] = useState('');
		useEffect(() => {
			console.log(value);
		}, [value]);
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
	});

	const Radio: React.FC<radioProps> = ({ positive = false }) => {
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
	return { AnswerBtn, Radio, Input };
};

export default useTest;