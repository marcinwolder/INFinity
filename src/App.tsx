import Navbar from './components/Navbar';
import { useEffect } from 'react';
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
		if (!localStorage.getItem('theme')) localStorage.setItem('theme', 'dark');
	}, []);
	useEffect(() => {
		dispatch(pathSlice.actions.updatePath());
	}, [location, dispatch]);
	return (
		<div className='drawer'>
			<MenuCheckbox />
			<div className='drawer-content'>
				<Navbar />
				<div className='p-2'>
					<div className='artboard gap-4 flex flex-col items-center relative'>
						<Breadcrumps />
						<Outlet />
					</div>
				</div>
			</div>
			<div className='drawer-side'>
				<label htmlFor='my-drawer' className='drawer-overlay'></label>
				<Menu />
			</div>
		</div>
	);
}

export default App;
