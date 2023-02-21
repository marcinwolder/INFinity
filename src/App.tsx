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
						<span>FORMUŁA 2023</span>
					</li>
					<div className='divider w-1/2 mx-auto'>2022</div>
					<li>
						<a>
							Grudzień
							<span className='ml-auto badge badge-sm badge-ghost'>PRÓBNA</span>
						</a>
						<a>
							Arkusz przykładowy
							<span className='ml-auto badge badge-sm badge-ghost'>PRÓBNA</span>
						</a>
					</li>
					<li className='menu-title py-2'>
						<span>FORMUŁA 2015</span>
					</li>
					<div className='divider w-1/2 mx-auto'>2022</div>
					<li>
						<a>
							Maj <span className='ml-auto badge badge-md'>MATURA</span>
						</a>
					</li>
					<li>
						<a>
							Czerwiec
							<span className='ml-auto badge badge-sm badge-outline'>
								DODATKOWY
							</span>
						</a>
					</li>
					<div className='divider w-1/2 mx-auto'>2021</div>
					<li>
						<a>
							Marzec
							<span className='ml-auto badge badge-sm badge-ghost'>PRÓBNA</span>
						</a>
					</li>
					<li>
						<a>
							Maj <span className='ml-auto badge badge-md'>MATURA</span>
						</a>
					</li>
					<li>
						<a>
							Czerwiec
							<span className='ml-auto badge badge-sm badge-outline'>
								DODATKOWY
							</span>
						</a>
					</li>
					<div className='divider w-1/2 mx-auto'>2020</div>
					<li>
						<a>
							Kwiecień
							<span className='ml-auto badge badge-sm badge-ghost'>PRÓBNA</span>
						</a>
					</li>
					<li>
						<a>
							Czerwiec <span className='ml-auto badge badge-md'>MATURA</span>
						</a>
					</li>
					<li>
						<a>
							Lipiec
							<span className='ml-auto badge badge-sm badge-outline'>
								DODATKOWY
							</span>
						</a>
					</li>
					<div className='divider w-1/2 mx-auto'>2019</div>
					<li>
						<a>
							Maj <span className='ml-auto badge badge-md'>MATURA</span>
						</a>
					</li>
					<li>
						<a>
							Czerwiec
							<span className='ml-auto badge badge-sm badge-outline'>
								DODATKOWY
							</span>
						</a>
					</li>
					<div className='divider w-1/2 mx-auto'>2018</div>
					<li>
						<a>
							Maj <span className='ml-auto badge badge-md'>MATURA</span>
						</a>
					</li>
					<li>
						<a>
							Czerwiec
							<span className='ml-auto badge badge-sm badge-outline'>
								DODATKOWY
							</span>
						</a>
					</li>
					<div className='divider w-1/2 mx-auto'>2017</div>
					<li>
						<a>
							Maj <span className='ml-auto badge badge-md'>MATURA</span>
						</a>
					</li>
					<li>
						<a>
							Czerwiec
							<span className='ml-auto badge badge-sm badge-outline'>
								DODATKOWY
							</span>
						</a>
					</li>
					<div className='divider w-1/2 mx-auto'>2016</div>
					<li>
						<a>
							Maj <span className='ml-auto badge badge-md'>MATURA</span>
						</a>
					</li>
					<li>
						<a>
							Czerwiec
							<span className='ml-auto badge badge-sm badge-outline'>
								DODATKOWY
							</span>
						</a>
					</li>
					<div className='divider w-1/2 mx-auto'>2015</div>
					<li>
						<a>
							Maj <span className='ml-auto badge badge-md'>MATURA</span>
						</a>
					</li>
					<li>
						<a>
							Czerwiec
							<span className='ml-auto badge badge-sm badge-outline'>
								DODATKOWY
							</span>
						</a>
					</li>
					<div className='divider w-1/2 mx-auto'>2014</div>
					<li>
						<a>
							Grudzień
							<span className='ml-auto badge badge-sm badge-ghost'>PRÓBNA</span>
						</a>
					</li>
					<li>
						<a>
							Arkusz przykładowy
							<span className='ml-auto badge badge-sm badge-ghost'>PRÓBNA</span>
						</a>
					</li>
					<li className='menu-title py-2'>
						<span>STARA FORMUŁA</span>
					</li>
				</ul>
			</div>
		</div>
	);
}

export default App;
