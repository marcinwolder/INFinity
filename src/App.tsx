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
					<li className='menu-title py-2'>
						<span>ARKUSZE</span>
					</li>
					<li>
						<a>
							Formuła 2023
							<span className='ml-auto badge badge-secondary'>NOWA!</span>
						</a>
					</li>
					<li>
						<a>Formuła 2015</a>
					</li>
					<li>
						<a>Stara Formuła</a>
					</li>
					<li className='menu-title py-2'>
						<span>O MATURZE</span>
					</li>
					<li>
						<a>
							Materiał
							<span className='badge badge-outline'>Aktualizacja 2023</span>
						</a>
					</li>
					<li>
						<a>Języki Programowania</a>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default App;
