import Navbar from './components/Navbar';
import { useEffect } from 'react';
import { themeChange } from 'theme-change';
import { Outlet } from 'react-router-dom';

import { MenuCheckbox } from './context/menuContext';
import Menu from './components/Menu';

function App() {
	useEffect(() => {
		themeChange(false);
	}, []);
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
