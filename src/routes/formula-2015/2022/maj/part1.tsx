import { useState } from 'react';
import Algorytm from './Algorytm';
import Analiza from './Analiza';
import Test from './Test';

const Part1 = () => {
	const [tab, setTab] = useState(-1);

	const tabs = [<Algorytm />, <Analiza />, <Test />];
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
			<div className='max-w-screen-md mx-auto'>
				{tab === -1 ? (
					<div className='w-screen overflow-hidden'></div>
				) : (
					tabs[tab]
				)}
			</div>
		</>
	);
};

export default Part1;
