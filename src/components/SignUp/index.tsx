import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AiFillGoogleCircle, AiFillFacebook } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { modalSlice } from '../../redux/slices/modal';
import { ToastContainer, toast } from 'react-toastify';
import passwordValidator from 'password-validator';
import { firebaseAuth } from '../../firebase';
import {
	createUserWithEmailAndPassword,
	updateProfile,
	GoogleAuthProvider,
	useDeviceLanguage,
	signInWithPopup,
	signOut,
} from 'firebase/auth';

import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames';

const SignUp = () => {
	const [signUpTransition, setTransition] = useState(false);
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [cPassword, setCPassword] = useState('');

	const passwordSchema = new passwordValidator();
	passwordSchema
		.is()
		.min(8, 'Hasło musi mieć min. 8 znaków')
		.is()
		.max(100, 'Hasło musi mieć max. 100 znaków')
		.has()
		.uppercase(1, 'Hasło musi zawierać wielką literę')
		.has()
		.lowercase(1, 'Hasło musi zawierać małą literę')
		.has()
		.digits(1, 'Hasło musi zawierać cyfrę')
		.has()
		.symbols(1, 'Hasło musi zawierać znak specjalny')
		.has()
		.not()
		.spaces();

	const validate = () => {
		const passErrors = passwordSchema.validate(password, {
			details: true,
		});
		if (!password || !cPassword || !username) {
			toast('Uzupełnij wszystkie pola!');
			return false;
		}
		if (password !== cPassword) {
			toast('Hasła muszą być takie same!');
			return false;
		}
		if (!passwordSchema.validate(password)) {
			{
				for (let error of passErrors as {
					message: string;
				}[]) {
					toast(error.message);
				}
				return false;
			}
		}
		return true;
	};

	const onSignUp = () => {
		if (validate()) {
			setTransition(true);
			(async () => {
				try {
					await createUserWithEmailAndPassword(firebaseAuth, email, password);
					const user = firebaseAuth;
					await updateProfile(user.currentUser!, { displayName: username });

					setTransition(false);
				} catch ({ code }) {
					const errorCode = code as string;
					if (errorCode === 'auth/email-already-in-use')
						toast('Podany adres email został już użyty!');

					setTransition(false);
				}
			})();
		}
	};
	const onGoogleSignUp = () => {
		setTransition(true);
		const provider = new GoogleAuthProvider();
		useDeviceLanguage(firebaseAuth);
		(async () => {
			try {
				await signInWithPopup(firebaseAuth, provider);
				setTransition(false);
			} catch (error) {
				setTransition(false);
			}
		})();
	};
	const onClickOutsideModal = (e: MouseEvent) => {
		const target = e.target as Node;
		if (!modalRef.current?.contains(target)) {
			dispatch(modalSlice.actions.setOpen({ type: 'signUp', value: false }));
		}
	};

	const modalRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		setTimeout(() => {
			window.addEventListener('click', onClickOutsideModal);
		}, 1);

		return () => {
			window.removeEventListener('click', onClickOutsideModal);
		};
	}, []);

	const dispatch = useDispatch();
	return createPortal(
		<div className='absolute inset-0'>
			<div className='w-full h-full bg-black opacity-40' />
			<ToastContainer
				position='top-right'
				autoClose={3000}
				closeOnClick
				theme='dark'
			/>
			<div
				ref={modalRef}
				className='fixed top-1/2 -translate-y-1/2 md:left-1/2 md:-translate-x-1/2 w-full md:w-1/2 bg-base-100 shadow-lg p-4 flex flex-col items-center'>
				<h1 className='text-2xl font-bold mb-4'>Rejestracja</h1>
				<div className='grid md:grid-cols-2 items-center gap-2 w-full md:w-max'>
					<label className='text-lg' htmlFor='username'>
						Nazwa użytkownika:
					</label>
					<input
						name='username'
						className='input input-md input-bordered w-full'
						type='text'
						onChange={(e) => setUsername(e.target.value)}
						value={username}
					/>
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
					<label className='text-lg' htmlFor='cPassword'>
						Powtórz hasło:
					</label>
					<input
						name='cPassword'
						className='input input-md input-bordered w-full'
						type='password'
						onChange={(e) => setCPassword(e.target.value)}
						value={cPassword}
					/>
				</div>
				<button
					disabled={signUpTransition}
					onClick={() => onSignUp()}
					className={classNames(
						'flex items-center gap-2 btn btn-wide btn-primary m-4',
						{ 'btn-disabled': signUpTransition }
					)}>
					Zarejestruj
				</button>
				<button
					onClick={() => {
						onGoogleSignUp();
					}}
					className='flex items-center gap-2 btn btn-wide hover:bg-red-600 hover:text-white mt-4'>
					Zarejestruj z Google <AiFillGoogleCircle />
				</button>
				<div className='flex items-center gap-2 btn btn-wide hover:bg-blue-700 hover:text-white mt-2'>
					Zarejestruj z Facebook <AiFillFacebook />
				</div>
			</div>
		</div>,
		document.getElementById('modal')!
	);
};

export default SignUp;
