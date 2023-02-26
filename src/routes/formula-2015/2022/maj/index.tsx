import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Part1 from './part1';

const Maj2022 = () => {
	const [tab, setTab] = useState(1);
	return (
		<div className='px-6'>
			<div className='breadcrumbs'>
				<ul>
					<li>
						<Link to={'/'}>Strona Główna</Link>
					</li>
					<li>
						<Link to={'/formula-2015'}>Formuła 2015</Link>
					</li>
					<li>Matura - Maj 2022</li>
				</ul>
			</div>
			<div className='tabs'>
				<a
					onClick={() => setTab(1)}
					className={`tab tab-bordered ${tab === 1 && 'tab-active'}`}>
					Część 1
				</a>
				<a
					onClick={() => setTab(2)}
					className={`tab tab-bordered ${tab === 2 && 'tab-active'}`}>
					Część 2
				</a>
			</div>
			<div className='pt-4'>{tab === 1 ? <Part1 /> : 'Tab2'}</div>
		</div>
	);
};

export default Maj2022;
