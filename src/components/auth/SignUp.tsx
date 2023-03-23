import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { authSlice } from '../../redux/slices/auth';
import { ToastContainer, toast } from 'react-toastify';
import passwordValidator from 'password-validator';
import { firebaseAuth } from '../../firebase';
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	signOut,
	updateProfile,
} from 'firebase/auth';

import 'react-toastify/dist/ReactToastify.css';
import classNames from 'classnames';
import Google from '../auth/Google';
import Facebook from '../auth/Facebook';
import { StateStore } from '../../redux';

const SignUp = () => {
	const [username, setUsername] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [cPassword, setCPassword] = useState('');

	const modalRef = useRef<HTMLDivElement>(null);

	const dispatch = useDispatch();
	const { transitionStart, transitionEnd, setOpen } = authSlice.actions;

	const { transition } = useSelector((state: StateStore) => state.auth);

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
			dispatch(transitionStart());
			(async () => {
				try {
					await createUserWithEmailAndPassword(firebaseAuth, email, password);
					const user = firebaseAuth;
					await updateProfile(user.currentUser!, { displayName: username });
					dispatch(setOpen({ type: 'signUp', value: false }));

					await sendEmailVerification(user.currentUser!);
					signOut(firebaseAuth);

					toast('Email weryfikacyjny został wysłany!');
					dispatch(transitionEnd());
				} catch ({ code }) {
					const errorCode = code as string;
					if (errorCode === 'auth/email-already-in-use')
						toast('Podany adres email został już użyty!');

					dispatch(transitionEnd());
				}
			})();
		}
	};

	const onClickOutsideModal = (e: MouseEvent) => {
		const target = e.target as Node;
		if (!modalRef.current?.contains(target)) {
			dispatch(setOpen({ type: 'signUp', value: false }));
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
				className='fixed top-1/2 -translate-y-1/2 lg:left-1/2 lg:-translate-x-1/2 w-full lg:w-1/2 bg-base-100 shadow-lg p-4 flex flex-col items-center'>
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
					disabled={transition}
					onClick={() => onSignUp()}
					className={classNames(
						'flex items-center gap-2 btn btn-wide btn-primary m-4',
						{ 'btn-disabled': transition }
					)}>
					{transition ? (
						<AiOutlineLoading3Quarters className='animate-spin duration-1000 text-xl' />
					) : (
						'Zarejestruj'
					)}
				</button>
				<Google text='Zarejestruj z Google' />
				<Facebook text='Zarejestruj z Facebook' />
			</div>
		</div>,
		document.getElementById('modal')!
	);
};

export default SignUp;
