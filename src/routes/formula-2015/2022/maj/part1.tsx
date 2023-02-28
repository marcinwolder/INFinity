import { useState } from 'react';
import Algorytm from './Algorytm';
import Test from './Test';

const Part1 = () => {
	const [tab, setTab] = useState(0);

	const tabs = [<Algorytm />, <></>, <Test />];
	return (
		<>
			<div className='mb-2 tabs bg-base-100 tabs-boxed justify-center'>
				<a
					onClick={() => setTab(0)}
					className={`tab ${tab === 0 && 'tab-active'}`}>
					Algorytm
				</a>
				<a
					onClick={() => setTab(1)}
					className={`tab ${tab === 1 && 'tab-active'}`}>
					Analiza
				</a>
				<a
					onClick={() => setTab(2)}
					className={`tab ${tab === 2 && 'tab-active'}`}>
					Test
				</a>
			</div>
			<div className='max-w-screen-md mx-auto'>{tabs[tab]}</div>
		</>
	);
};

export default Part1;
