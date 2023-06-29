import React from 'react';
import { MenuLink } from '../context/menuContext';
import { usePathElements } from '../redux/slices/pathSlice';

const markSelected = (elements: React.ReactElement) => {
	const path = usePathElements();
	const values = [];
	for (const element of elements.props.children) {
		if (element.props.url === path[1])
			values.push(
				<li
					key={element.props.url}
					className='bordered bg-base-200 rounded-r-lg'>
					{element}
				</li>
			);
		else values.push(<li key={element.props.url}>{element}</li>);
	}
	return values;
};

const Menu = () => {
	return (
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
				<MenuLink url='/material'>
					Materiał
					<span className='badge badge-outline'>Aktualizacja 2023</span>
				</MenuLink>
			</li>
			<li>
				<MenuLink url='/wybor-jezyka'>Języki Programowania</MenuLink>
			</li>
		</ul>
	);
};

export default Menu;
