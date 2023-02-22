import Navbar from './components/Navbar';
import { useContext, useEffect } from 'react';
import { themeChange } from 'theme-change';
import { Outlet } from 'react-router-dom';

import { MenuCheckbox, MenuContext, MenuLink } from './context/menuContext';

const markSelected = (elements: React.ReactElement) => {
	const { option } = useContext(MenuContext);
	const values = [];
	for (const element of elements.props.children) {
		if (element.props.url === option)
			values.push(
				<li key={element.props.url} className='bordered'>
					{element}
				</li>
			);
		else values.push(<li key={element.props.url}>{element}</li>);
	}
	return values;
};

function App() {
	useEffect(() => {
		themeChange(false);
	}, []);
	return (
		<div className='drawer'>
			<MenuCheckbox />
			<div className='drawer-content'>
				<Navbar />
				<div>
					<Outlet />
				</div>
			</div>
			<div className='drawer-side'>
				<label htmlFor='my-drawer' className='drawer-overlay'></label>
				<ul className='menu p-4 w-80 bg-base-100 text-base-content'>
					<li className='menu-title py-2'>
						<span>ARKUSZE</span>
					</li>
					{markSelected(
						<>
							<MenuLink url='/formula-2023'>
								Formuła 2023
								<span className='ml-auto badge badge-secondary'>NOWA!</span>
							</MenuLink>
							<MenuLink url='/formula-2015'>Formuła 2015</MenuLink>
							<MenuLink url='/formula-stara'>Stara Formuła</MenuLink>
						</>
					)}
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
