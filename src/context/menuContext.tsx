import React, { createContext, useContext, useState } from 'react';
import { Link as BaseLink } from 'react-router-dom';

export const MenuContext = createContext<{
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({ isOpen: false, setOpen() {} });

export const MenuProvider: React.FC<React.PropsWithChildren<{}>> = ({
	children,
}) => {
	const [isOpen, setOpen] = useState(false);
	return (
		<MenuContext.Provider value={{ isOpen, setOpen }}>
			{children}
		</MenuContext.Provider>
	);
};

export const MenuLink: React.FC<
	React.PropsWithChildren<{ url: string; className?: string }>
> = ({ children, url, className }) => {
	const { setOpen } = useContext(MenuContext);

	return (
		<BaseLink
			onClick={() => {
				setOpen(false);
			}}
			className={className}
			to={url}>
			{children}
		</BaseLink>
	);
};

export const MenuBtn: React.FC<
	React.PropsWithChildren<{ className?: string }>
> = ({ children, className }) => {
	const { setOpen } = useContext(MenuContext);

	return (
		<button
			className={className}
			onClick={() => {
				setOpen(true);
			}}>
			{children}
		</button>
	);
};

export const MenuCheckbox = () => {
	const { isOpen, setOpen } = useContext(MenuContext);

	return (
		<input
			onChange={() => {
				setOpen(false);
			}}
			id='my-drawer'
			type='checkbox'
			className='drawer-toggle'
			checked={isOpen}
		/>
	);
};
