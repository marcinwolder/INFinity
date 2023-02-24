import { useState } from 'react';

import { Link } from 'react-router-dom';
import { usePath } from '../context/menuContext';

const mapOpened = (
	elements: React.ReactElement<React.PropsWithChildren<{}>>,
	open: string
) => {
	const values = [];
	for (const element of elements.props.children as React.ReactElement<
		React.PropsWithChildren<{
			'data-year': string;
			className: string;
		}>
	>[]) {
		if (element.props['data-year'] == open) {
			values.push(
				<div
					tabIndex={0}
					data-year={element.props['data-year']}
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
	return (
		<div className='artboard gap-4 flex flex-col items-center relative'>
			<h1 className='text-2xl small-caps self-start p-2 pr-4 rounded-tr-xl rounded-br-md bg-secondary-focus text-secondary-content'>
				Formuła 2015
			</h1>
			{mapOpened(
				<>
					<div
						tabIndex={0}
						data-year={'2022'}
						className='collapse collapse-arrow border border-base-300 bg-base-200 rounded-box w-80'
						onClick={() => setOpen('2022')}>
						<div className='collapse-title text-xl font-medium'>2022</div>
						<div className='collapse-content'>
							<ul className='menu menu-compact'>
								<li className='flex'>
									<Link to={url + '/2022/maj'} className='text-lg'>
										Maj
										<span className='badge badge-primary rounded-badge ml-auto'>
											MATURA
										</span>
									</Link>
								</li>
								<li className='flex'>
									<a className='text-lg'>
										Czerwiec
										<div className='badge badge-outline rounded-badge ml-auto'>
											DODATKOWA
										</div>
									</a>
								</li>
							</ul>
						</div>
					</div>
					<div
						tabIndex={0}
						data-year={'2021'}
						className='collapse collapse-arrow border border-base-300 bg-base-200 rounded-box w-80'
						onClick={() => setOpen('2021')}>
						<div className='collapse-title text-xl font-medium'>2021</div>
						<div className='collapse-content'>
							<ul className='menu menu-compact'>
								<li className='flex'>
									<a className='text-lg'>
										Marzec
										<div className='badge badge-ghost rounded-badge ml-auto bg-base-300'>
											PRÓBNA
										</div>
									</a>
								</li>
								<li className='flex'>
									<a className='text-lg'>
										Maj
										<div className='badge badge-primary rounded-badge ml-auto'>
											MATURA
										</div>
									</a>
								</li>
								<li className='flex'>
									<a className='text-lg'>
										Czerwiec
										<div className='badge badge-outline rounded-badge ml-auto'>
											DODATKOWA
										</div>
									</a>
								</li>
							</ul>
						</div>
					</div>
				</>,
				open
			)}
		</div>
	);
};

export default Main;
