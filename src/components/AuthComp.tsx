import { modals } from '@mantine/modals';

import SignUp from './SignUp';
import LightDarkThemeImg from './LightDarkThemeImg';
import InfinitySmall from './../img/InfinitySmall.png';
import InfinitySmallDark from './../img/InfinitySmall-dark.png';
import SignIn from './SignIn';
import { firebaseAuth } from '../main';
import { Auth } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { BiExit, BiUser } from 'react-icons/bi';
import { useForceUpdate } from '@mantine/hooks';

const AuthComp = () => {
	const forceUpdate = useForceUpdate();

	//Dropdown ref
	const ref = useRef<HTMLDivElement>(null);
	const [auth, setAuth] = useState<Auth | null>(null);

	useEffect(() => {
		firebaseAuth.onAuthStateChanged(() => {
			setAuth(firebaseAuth);
			forceUpdate();
		});
	}, [forceUpdate, auth]);

	const openSignUpModal = () =>
		modals.open({
			modalId: 'signUpModal',
			title: (
				<div className='flex items-center gap-4'>
					<LightDarkThemeImg
						className='h-8'
						light={InfinitySmall}
						dark={InfinitySmallDark}
					/>
					<div className='flex flex-col gap-1'>
						<div
							className='text-base-content underline underline-offset-2 hover:no-underline hover:text-info hover:cursor-pointer'
							onClick={() => {
								modals.close('signUpModal');
								openSignInModal();
							}}>
							Zaloguj się
						</div>
						<p className='font-bold uppercase font-mono'>/ Zarejestruj się</p>
					</div>
				</div>
			),
			children: <SignUp forceUpdate={forceUpdate} />,
		});
	const openSignInModal = () =>
		modals.open({
			modalId: 'signInModal',
			title: (
				<div className='flex items-center gap-4'>
					<LightDarkThemeImg
						className='h-8'
						light={InfinitySmall}
						dark={InfinitySmallDark}
					/>
					<div className='flex flex-col gap-1'>
						<p className='font-bold uppercase font-mono'>Zaloguj się</p>
						<div
							className='text-base-content underline underline-offset-2 hover:no-underline hover:text-info hover:cursor-pointer'
							onClick={() => {
								modals.close('signInModal');
								openSignUpModal();
							}}>
							/ Zarejestruj się
						</div>
					</div>
				</div>
			),
			children: <SignIn />,
		});

	return auth?.currentUser ? (
		<div ref={ref} className='dropdown dropdown-end'>
			<label
				tabIndex={0}
				className='relative btn flex items-center gap-2 px-2 overflow-hidden justify-start flex-nowrap max-w-[7rem] md:max-w-none'>
				<span className='text-lg'>
					<BiUser />
				</span>
				{auth.currentUser.displayName}
				<div className='absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l md:bg-none from-base-200 via-20% via-base-200' />
			</label>
			<ul
				tabIndex={0}
				className='dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52'>
				<li>
					<a
						onClick={() => {
							auth.signOut();
						}}
						className='flex justify-between'>
						Wyloguj
						<span>
							<BiExit />
						</span>
					</a>
				</li>
			</ul>
		</div>
	) : (
		<div
			className='btn text-xs px-2 gap-0 w-min md:w-fit'
			onClick={openSignInModal}>
			<div className='m-2'>
				<span className='inline-block'>ZALOGUJ</span>{' '}
				<span className='hidden md:inline'>/</span>{' '}
				<span className='inline-block'>ZAREJESTRUJ</span>
			</div>
		</div>
	);
};

export default AuthComp;
