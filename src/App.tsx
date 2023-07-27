import Navbar from './components/Navbar';
import { useEffect } from 'react';
import { themeChange } from 'theme-change';
import { Outlet, useLocation } from 'react-router-dom';

import { MenuCheckbox } from './context/menuContext';
import Menu from './components/Menu';
import { useDispatch } from 'react-redux';
import { pathSlice } from './redux/slices/pathSlice';

function App() {
	const location = useLocation();
	const dispatch = useDispatch();
	useEffect(() => {
		themeChange(false);
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
					<Outlet />
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
