import Navbar from './components/Navbar';
import { useEffect } from 'react';
import { themeChange } from 'theme-change';
import { Outlet, useLocation } from 'react-router-dom';

import { MenuCheckbox } from './context/menuContext';
import Menu from './components/Menu';
import { pathSlice2 } from './redux/slices/pathSlice2';
import { useDispatch } from 'react-redux';

function App() {
	const location = useLocation();
	const dispatch = useDispatch();
	useEffect(() => {
		themeChange(false);
	}, []);
	useEffect(() => {
		dispatch(pathSlice2.actions.updatePath());
		console.log('USE EFFECT');
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
