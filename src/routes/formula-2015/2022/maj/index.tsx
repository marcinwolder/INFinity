import { useState } from 'react';
import { usePath } from '../../../../redux/slices/path';
import Part1 from './part1';

const Maj2022 = () => {
	const [tab, setTab] = useState(1);
	usePath('/2022/maj');
	return (
		<div className='sm:px-0 md:px-6'>
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
