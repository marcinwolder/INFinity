import React from 'react';

interface props {
	setOpen: React.Dispatch<React.SetStateAction<string>>;
	open: string;
	year: string;
}

const YearDropdown: React.FC<React.PropsWithChildren<props>> = ({
	setOpen,
	year,
	open,
	children,
}) => {
	if (open == year) {
		return (
			<div
				tabIndex={0}
				data-year={year}
				className='collapse collapse-open collapse-arrow border border-base-300 bg-base-200 rounded-box w-80'
				onClick={() => setOpen(year)}>
				<div className='collapse-title text-xl font-medium'>{year}</div>
				<div className='collapse-content'>
					<ul className='menu menu-compact'>{children}</ul>
				</div>
			</div>
		);
	}
	return (
		<div
			tabIndex={0}
			data-year={year}
			className='collapse collapse-arrow border border-base-300 bg-base-200 rounded-box w-80'
			onClick={() => setOpen(year)}>
			<div className='collapse-title text-xl font-medium'>{year}</div>
			<div className='collapse-content'>
				<ul className='menu menu-compact'>{children}</ul>
			</div>
		</div>
	);
};

export default YearDropdown;
