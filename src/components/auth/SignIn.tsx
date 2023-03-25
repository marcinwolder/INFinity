import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { authSlice } from '../../redux/slices/auth';
import { ToastContainer, toast } from 'react-toastify';
import passwordValidator from 'password-validator';
import { firebaseAuth } from '../../firebase';
import {
	signInWithEmailAndPassword,
	signOut,
	updateProfile,
} from 'firebase/auth';

import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames';
import Google from './Google';
import Facebook from './Facebook';
import { StateStore } from '../../redux';

const SignUp = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const modalRef = useRef<HTMLDivElement>(null);

	const dispatch = useDispatch();
	const { transitionStart, transitionEnd, setOpen } = authSlice.actions;

	const { transition } = useSelector((state: StateStore) => state.auth);

	const onSignIn = () => {
		dispatch(transitionStart());
		(async () => {
			try {
				await signInWithEmailAndPassword(firebaseAuth, email, password);
				const user = firebaseAuth;

				if (!user.currentUser?.emailVerified) {
					signOut(firebaseAuth);
					toast('Przed zalogowaniem należy zweryfikować maila');
				}

				dispatch(transitionEnd());
			} catch ({ code }) {
				const errorCode = code as string;
				console.log(errorCode);
				if (errorCode === 'auth/user-not-found')
					toast('Podany email nie jest powiązany z żadnym kontem!');
				else if (errorCode === 'auth/wrong-password')
					toast('Niepoprawne hasło!');

				dispatch(transitionEnd());
			}
		})();
	};

	const onClickOutsideModal = (e: MouseEvent) => {
		const target = e.target as Node;
		if (!modalRef.current?.contains(target)) {
			dispatch(setOpen({ type: 'signIn', value: false }));
		}
	};

	useEffect(() => {
		setTimeout(() => {
			window.addEventListener('click', onClickOutsideModal);
		}, 1);

		return () => {
			window.removeEventListener('click', onClickOutsideModal);
		};
	}, []);

	return createPortal(
		<div className='absolute inset-0'>
			<div className='w-full h-full bg-black opacity-40' />
			<div
				ref={modalRef}
				className='fixed top-1/2 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2 w-full md:w-1/2 bg-base-100 shadow-lg p-4 flex flex-col items-center'>
				<h1 className='text-2xl font-bold mb-4'>Logowanie</h1>
				<div className='grid md:grid-cols-2 items-center gap-2 w-full md:w-max'>
					<label className='text-lg' htmlFor='email'>
						Email:
					</label>
					<input
						name='email'
						className='input input-md input-bordered w-full'
						type='email'
						onChange={(e) => setEmail(e.target.value)}
						value={email}
					/>
					<label className='text-lg' htmlFor='password'>
						Hasło:
					</label>
					<input
						name='password'
						className='input input-md input-bordered w-full'
						type='password'
						onChange={(e) => setPassword(e.target.value)}
						value={password}
					/>
				</div>
				<button
					disabled={transition}
					onClick={() => onSignIn()}
					className={classNames(
						'flex items-center gap-2 btn btn-wide btn-primary m-4',
						{ 'btn-disabled': transition }
					)}>
					{transition ? (
						<AiOutlineLoading3Quarters className='animate-spin duration-1000 text-xl' />
					) : (
						'Zaloguj'
					)}
				</button>
				<Google text='Zaloguj z Google' />
				<Facebook text='Zaloguj z Facebook' />
			</div>
		</div>,
		document.getElementById('modal')!
	);
};

export default SignUp;
