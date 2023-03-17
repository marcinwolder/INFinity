import React, { useContext, useEffect, useState } from 'react';
import { BsFillSunFill, BsFillMoonFill } from 'react-icons/bs';
import { AiOutlineCode } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { MenuBtn, MenuContext } from '../context/menuContext';
import { useDispatch, useSelector } from 'react-redux';
import { StateStore } from '../redux';
import SignUp from './SignUp';
import { modalSlice } from '../redux/slices/modal';
import { firebaseAuth } from '../firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import classNames from 'classnames';

const Navbar: React.FC = () => {
	useEffect(() => {
		onAuthStateChanged(firebaseAuth, (user) => {
			setLoggedIn(user !== null);
		});
	}, []);
	const modalState = useSelector((state: StateStore) => state.modal);
	const dispatch = useDispatch();
	const [loggedIn, setLoggedIn] = useState(false);

	const avatarUrl = firebaseAuth.currentUser?.photoURL;

	return (
		<div className='navbar bg-base-100 gap-2'>
			<div className='flex-none'>
				<input id='my-drawer' type='checkbox' className='drawer-toggle' />
				<MenuBtn className='btn btn-square btn-ghost drawer-button'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						fill='none'
						viewBox='0 0 24 24'
						className='inline-block w-5 h-5 stroke-current'>
						<path
							strokeLinecap='round'
							strokeLinejoin='round'
							strokeWidth='2'
							d='M4 6h16M4 12h16M4 18h16'></path>
					</svg>
				</MenuBtn>
			</div>
			<div className='hidden sm:block flex-1'>
				<Link to={'/'} className='btn btn-ghost normal-case text-xl small-caps'>
					<AiOutlineCode className='mr-1 text-base' />
					<span className='text-sky-500 pr-2 mb-0.5'>[</span>INF
					<span className='text-red-500 px-2 mb-0.5'>{'}'}</span>
					<span className='mb-1.5'>ormator</span>
				</Link>
			</div>
			<div className='flex-1 sm:hidden'>
				<Link to={'/'} className='btn btn-ghost normal-case text-xl small-caps'>
					<span className='text-sky-500 pr-1 mb-0.5'>[</span>
					<AiOutlineCode className='mr-1 text-base' />
					<span className='text-red-500 mb-0.5'>{'}'}</span>
				</Link>
			</div>
			{loggedIn ? (
				<>
					<div className={classNames('avatar', { placeholder: !avatarUrl })}>
						<div className='bg-neutral-focus text-neutral-content rounded-full w-8'>
							{avatarUrl ? (
								<img src={avatarUrl} />
							) : (
								<span className='text-3xl'>
									{firebaseAuth.currentUser?.displayName![0]}
								</span>
							)}
						</div>
					</div>
					<button
						className='btn'
						onClick={() => {
							signOut(firebaseAuth);
							dispatch(
								modalSlice.actions.setOpen({ type: 'signUp', value: false })
							);
						}}>
						LOGOUT
					</button>
				</>
			) : (
				<div className='btn-group'>
					<div
						className='btn'
						onClick={() => {
							dispatch(
								modalSlice.actions.setOpen({ type: 'signUp', value: true })
							);
						}}>
						SIGN UP
					</div>
					<div className='btn'>LOG IN</div>
					{modalState.signUp && <SignUp />}
				</div>
			)}

			<div className='flex gap-2'>
				<button
					className='rounded-md p-1 h-6 w-6 ease-in-out transition-all flex justify-center items-center'
					data-set-theme='retro'
					data-act-class='theme-selected'>
					<BsFillSunFill />
				</button>
				<button
					className='rounded-md p-1 h-6 w-6 ease-in-out transition-all flex justify-center items-center'
					data-set-theme='dark'
					data-act-class='theme-selected'>
					<BsFillMoonFill />
				</button>
			</div>
		</div>
	);
};

export default Navbar;
