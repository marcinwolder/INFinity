import Navbar from './components/Navbar';
import { useEffect, useLayoutEffect } from 'react';
import { themeChange } from 'theme-change';
import { Outlet, useLocation } from 'react-router-dom';

import { MenuCheckbox } from './context/menuContext';
import Menu from './components/Menu';
import { useDispatch } from 'react-redux';
import { pathSlice } from './redux/slices/pathSlice';
import Breadcrumps from './components/Breadcrumps';

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
		if (!localStorage.getItem('theme')) {
			const hour = new Date().getHours();
			console.log('🚀 ~ file: App.tsx:25 ~ useLayoutEffect ~ hour:', hour);
			if (hour < 8 || hour > 20) {
				console.log('noc');
				localStorage.setItem('theme', 'dark');
			} else {
				console.log('dzień');
				localStorage.setItem('theme', 'emerald');
			}
		}
	}, []);

	return (
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
	);
}

export default App;
