import React, { createContext, useContext, useState, useEffect } from 'react';
import { Link as BaseLink } from 'react-router-dom';

export const usePath = (url: string) => {
	const { setOption } = useContext(MenuContext);
	useEffect(() => {
		setOption(url);
	});
};

export const MenuContext = createContext<{
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	option: string;
	setOption: React.Dispatch<React.SetStateAction<string>>;
}>({ isOpen: false, setOpen() {}, option: '', setOption() {} });

export const MenuProvider: React.FC<React.PropsWithChildren<{}>> = ({
	children,
}) => {
	const [option, setOption] = useState('');
	const [isOpen, setOpen] = useState(false);
	return (
		<MenuContext.Provider value={{ isOpen, setOpen, option, setOption }}>
			{children}
		</MenuContext.Provider>
	);
};

export const MenuLink: React.FC<
	React.PropsWithChildren<{ url: string; className?: string }>
> = ({ children, url, className }) => {
	const { setOpen, setOption } = useContext(MenuContext);

	return (
		<BaseLink
			onClick={() => {
				setOpen(false);
				setOption(url);
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
