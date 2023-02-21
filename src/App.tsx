import Navbar from './components/Navbar';
import { createRef } from 'react';

import { useEffect } from 'react';
import { themeChange } from 'theme-change';

function App() {
	useEffect(() => {
		themeChange(false);
	}, []);
	const ref = createRef<HTMLInputElement>();
	return (
		<div className='drawer'>
			<input
				ref={ref}
				id='my-drawer'
				type='checkbox'
				className='drawer-toggle'
			/>
			<div className='drawer-content'>
				<Navbar menuRef={ref} />
			</div>
			<div className='drawer-side'>
				<label htmlFor='my-drawer' className='drawer-overlay'></label>
				<ul className='menu p-4 w-80 bg-base-100 text-base-content'>
					<li className='menu-title'>
						<span>FORMUŁA 2023</span>
					</li>
					<li>
						<a>Arkusz przykładowy</a>
					</li>
					<li className='menu-title'>
						<span>FORMUŁA 2015</span>
					</li>
					<li>
						<a>
							2022 - Maj <span className='ml-auto badge badge-md'>MATURA</span>
						</a>
					</li>
					<li>
						<a>
							2022 - Czerwiec
							<span className='ml-auto badge badge-sm badge-outline'>
								DODATKOWY
							</span>
						</a>
					</li>
					<li className='menu-title'>
						<span>STARA FORMUŁA</span>
					</li>
					<li>
						<a>Item 1</a>
					</li>
					<li>
						<a>Item 2</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default App;
