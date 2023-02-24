import { useState } from 'react';

import { Link } from 'react-router-dom';
import { usePath } from '../context/menuContext';
import useYearDropdown from '../components/YearDropdown';

const mapOpened = (
	elements: React.ReactElement<React.PropsWithChildren<{}>>,
	open: string
) => {
	const values = [];
	for (const element of elements.props.children as React.ReactElement<
		React.PropsWithChildren<{
			year: string;
			className: string;
		}>
	>[]) {
		if (element.props.year == open) {
			values.push(
				<div
					tabIndex={0}
					data-year={element.props.year}
					className='collapse collapse-open collapse-arrow border border-base-300 bg-base-200 rounded-box w-80'>
					{element.props.children}
				</div>
			);
		} else values.push(element);
	}
	return values;
};

const Main = () => {
	const url = usePath('/formula-2015');

	const [open, setOpen] = useState('2022');
	const YearDropdown = useYearDropdown(open, setOpen);

	return (
		<div className='artboard gap-4 flex flex-col items-center relative'>
			<h1 className='text-2xl small-caps self-start p-2 pr-4 rounded-tr-xl rounded-br-md bg-secondary-focus text-secondary-content'>
				Formuła 2015
			</h1>
			<YearDropdown year='2022'>
				<li>
					<Link to={url + '/2022/maj'} className='text-lg'>
						Maj
						<span className='badge badge-primary rounded-badge ml-auto'>
							MATURA
						</span>
					</Link>
				</li>
				<li>
					<a className='text-lg'>
						Czerwiec
						<div className='badge badge-outline rounded-badge ml-auto'>
							DODATKOWA
						</div>
					</a>
				</li>
			</YearDropdown>
			<YearDropdown year='2021'>
				<li>
					<a className='text-lg'>
						Marzec
						<div className='badge badge-ghost rounded-badge ml-auto bg-base-300'>
							PRÓBNA
						</div>
					</a>
				</li>
				<li>
					<a className='text-lg'>
						Maj
						<div className='badge badge-primary rounded-badge ml-auto'>
							MATURA
						</div>
					</a>
				</li>
				<li>
					<a className='text-lg'>
						Czerwiec
						<div className='badge badge-outline rounded-badge ml-auto'>
							DODATKOWA
						</div>
					</a>
				</li>
			</YearDropdown>
		</div>
	);
};

export default Main;
