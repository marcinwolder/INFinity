import React, { createContext, useRef, useState } from 'react';
import { Link as BaseLink } from 'react-router-dom';

const [isOpen, setOpen] = useState(false);

const MenuLink: React.FC<React.PropsWithChildren<{ url: string }>> = ({
	children,
	url,
}) => {
	return (
		<BaseLink
			onClick={() => {
				setOpen(false);
			}}
			to={url}>
			{children}
		</BaseLink>
	);
};
const MenuBtn: React.FC<React.PropsWithChildren<{ url: string }>> = ({
	children,
}) => {
	return (
		<button
			onClick={() => {
				setOpen(true);
			}}>
			{children}
		</button>
	);
};

const MenuCheckbox = () => {
	return (
		<input
			id='my-drawer'
			type='checkbox'
			className='drawer-toggle'
			checked={isOpen}
		/>
	);
};

export default createContext({ isOpen, setOpen });

export { MenuLink, MenuBtn, MenuCheckbox };
