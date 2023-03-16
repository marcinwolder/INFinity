import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { IoMdClose } from 'react-icons/io';
import { AiFillGoogleCircle, AiFillFacebook } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { modalSlice } from '../../redux/slices/modal';
import { StateStore } from '../../redux';
import { ToastContainer, toast } from 'react-toastify';
import passwordValidator from 'password-validator';

import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
	const [username, setUsername] = useState('');
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

	const onSignUp = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (password !== cPassword) toast('Hasła muszą być takie same!');
		if (!password || !cPassword || !username)
			toast('Uzupełnij wszystkie pola!');
		for (let error of passwordSchema.validate(password, { details: true }) as {
			message: string;
		}[]) {
			toast(error.message);
		}
	};
	const onClickOutsideModal = (e: MouseEvent) => {
		const target = e.target as Node;
		if (!modalRef.current?.contains(target)) {
			dispatch(modalSlice.actions.setOpen({ type: 'signUp', value: false }));
		}
	};

	const show = useSelector((state: StateStore) => state);
	const modalRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		console.log('rendered');
		setTimeout(() => {
			window.addEventListener('click', onClickOutsideModal);
		}, 1);

		return () => {
			console.log('de-rendered');
			window.removeEventListener('click', onClickOutsideModal);
		};
	}, []);

	const dispatch = useDispatch();
	return createPortal(
		<div className='absolute inset-0'>
			<div className='w-full h-full bg-black opacity-40' />
			<ToastContainer
				position='top-center'
				autoClose={3000}
				closeOnClick
				theme='dark'
			/>
			<div
				ref={modalRef}
				className='fixed top-1/2 -translate-y-1/2 sm:left-1/2 sm:-translate-x-1/2 w-full sm:w-1/2 bg-base-100 shadow-lg p-4 flex flex-col items-center'>
				<h1 className='text-2xl font-bold mb-4'>Rejestracja</h1>
				<div className='grid sm:grid-cols-2 items-center gap-2 w-full sm:w-max'>
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
				<div
					onClick={(e) => onSignUp(e)}
					className='flex items-center gap-2 btn btn-wide btn-primary m-4'>
					Zarejestruj
				</div>
				<div className='flex items-center gap-2 btn btn-wide hover:bg-red-600 hover:text-white mt-4'>
					Zarejestruj z Google <AiFillGoogleCircle />
				</div>
				<div className='flex items-center gap-2 btn btn-wide hover:bg-blue-700 hover:text-white mt-2'>
					Zarejestruj z Facebook <AiFillFacebook />
				</div>
			</div>
		</div>,
		document.getElementById('modal')!
	);
};

export default SignUp;
