import Navbar from './components/Navbar';
import { useEffect, useLayoutEffect } from 'react';
import { themeChange } from 'theme-change';
import { Outlet, useLocation } from 'react-router-dom';

import { MenuCheckbox } from './context/menuContext';
import Menu from './components/Menu';
import { useDispatch } from 'react-redux';
import { pathSlice } from './redux/slices/pathSlice';
import Breadcrumps from './components/Breadcrumps';

import { Toaster } from 'react-hot-toast';

function App() {
	const location = useLocation();
	const dispatch = useDispatch();

	useEffect(() => {
		themeChange(false);
	}, []);
	useEffect(() => {
		dispatch(pathSlice.actions.updatePath());
	}, [location, dispatch]);
	useLayoutEffect(() => {
		// const date = new Date('February 14, 08 12:34:51'); //valentine's day
		// const date = new Date('October 31, 08 21:34:51'); //halloween
		// const date = new Date('February 14, 08 21:34:51'); //halloween
		const date = new Date();

		const hour = date.getHours();
		const day = date.getDate();
		const month = date.getMonth();

		if (month === 1 && day >= 13 && day <= 15) {
			localStorage.setItem('theme', 'valentine');
		} else if ((month === 9 && day >= 29) || (month === 10 && day <= 2)) {
			localStorage.setItem('theme', 'halloween');
		} else if (
			!localStorage.getItem('theme') ||
			(localStorage.getItem('theme') !== 'dark' &&
				localStorage.getItem('theme') !== 'emerald')
		) {
			if (hour < 8 || hour > 19) {
				localStorage.setItem('theme', 'dark');
			} else {
				localStorage.setItem('theme', 'emerald');
			}
		}
	}, []);

	return (
		<>
			<div className='drawer'>
				<MenuCheckbox />
				<div className='drawer-content'>
					<Navbar />
					<div>
						<div className='artboard gap-4 flex flex-col items-center relative'>
							<Breadcrumps />
							<Outlet />
						</div>
					</div>
				</div>
				<div className='drawer-side z-20'>
					<label htmlFor='my-drawer' className='drawer-overlay'></label>
					<Menu />
				</div>
			</div>
			<Toaster position='bottom-right' />
		</>
	);
}

export default App;
