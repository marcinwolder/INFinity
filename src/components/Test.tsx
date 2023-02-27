import React, { useState } from 'react';
import { TiTick, TiTimes } from 'react-icons/ti';

interface btnProps {
	show: boolean;
	setShow: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AnswerBtn: React.FC<btnProps> = ({ show, setShow }) => {
	if (show)
		return (
			<button className='btn btn-secondary btn-disabled'>
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

interface testProps {
	show: boolean;
	answer: string;
}

export const TestInput: React.FC<testProps> = ({ show, answer }) => {
	const [value, setValue] = useState('');
	return (
		<div className={`w-20 mx-auto rounded-md`}>
			{show ? (
				<p className='w-full flex gap-2 items-center justify-center'>
					{value || '--'}
					{value === answer ? (
						<TiTick className='text-green-500 text-xl' />
					) : (
						<>
							<TiTimes className='text-red-500 text-xl' />{' '}
							<p className='underline underline-offset-2'>({answer})</p>
						</>
					)}
				</p>
			) : (
				<input
					className='border-0 border-base-300 px-2 w-full rounded-md bg-base-300'
					type='text'
					placeholder='odp.:'
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			)}
		</div>
	);
};
