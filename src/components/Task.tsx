import React from 'react';

interface props {
	title: string;
	pkt?: number;
	show?: boolean;
}

const Task: React.FC<React.PropsWithChildren<props>> = ({
	title,
	pkt = 1,
	children,
	show = false,
}) => {
	return (
		<div className='p-3 bg-white rounded-lg my-7 shadow-md shadow-neutral-500'>
			<h1 className='bg-2015 text-black font-bold pl-1'>
				Zadanie {title}
				{show && `. (0-${pkt})`}
			</h1>
			<div className='text-black'>{children}</div>
		</div>
	);
};

export default Task;
