import { PasswordInput, TextInput, Notification } from '@mantine/core';
import {
	useForm,
	hasLength,
	matchesField,
	isEmail,
	matches,
} from '@mantine/form';
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';
import { useDisclosure } from '@mantine/hooks';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { modals } from '@mantine/modals';
import { toast } from 'react-hot-toast';

import { firebaseApp } from '../main';
import AnimatedToast from './AnimatedToast';
import ThemeImg from './ThemeImg';

import InfinitySmallDark from './../img/InfinitySmall-dark.png';
import InfinitySmall from './../img/InfinitySmall.png';

const SignUp = () => {
	const auth = getAuth(firebaseApp);
	const [disabled, { open: disableBtn, close: enableBtn }] = useDisclosure();

	const formEl = useForm({
		validateInputOnBlur: true,
		initialValues: {
			username: '',
			email: '',
			password: '',
			confirmPassword: '',
		},
		validate: {
			username: (value) =>
				hasLength(
					{ min: 6 },
					'Nazwa użytkownika musi mieć min. 6 znaków.'
				)(value) ||
				hasLength(
					{ max: 24 },
					'Nazwa użytkownika moze mieć max. 24 znaki.'
				)(value) ||
				null,
			email: isEmail('Nieprawidłowy email'),
			password: (value) => {
				return (
					hasLength({ min: 8 }, 'Hasło musi miec min. 8 znaków.')(value) ||
					matches(
						/[~`!@#$%^&*()_\-+=|\\[{\]};:'",<.>/?]+/g,
						'Hasło musi zawierać min. 1 znak specjalny.'
					)(value) ||
					matches(/\d+/g, 'Hasło musi zawierać min. 1 cyfrę.')(value) ||
					matches(
						/[A-Z]+/g,
						'Hasło musi zawierac min. 1 wielką literę.'
					)(value) ||
					matches(
						/[a-z]+/g,
						'Hasło musi zawierac min. 1 małą literę.'
					)(value) ||
					null
				);
			},
			confirmPassword: matchesField('password', 'Hasła muszą być takie same.'),
		},
	});

	return (
		<>
			<form className='mb-2'>
				<TextInput
					disabled={disabled}
					label='Nazwa użytkownika: '
					{...formEl.getInputProps('username')}
				/>
				<TextInput
					disabled={disabled}
					label='Email: '
					placeholder='email@test.pl'
					{...formEl.getInputProps('email')}
				/>
				<PasswordInput
					disabled={disabled}
					label='Hasło:'
					{...formEl.getInputProps('password')}
				/>
				<PasswordInput
					disabled={disabled}
					label='Potwierdź hasło:'
					{...formEl.getInputProps('confirmPassword')}
				/>
			</form>
			<div className='flex'>
				<div className='w-40 h-20 place-self-end border-dashed overflow-hidden border-base-content border-l-2 border-b-2 rounded-bl-box '>
					{/* TODO: ANIMATED DRAWING LOGO HERE */}
					<ThemeImg
						className='h-40 w-48 relative -top-4 -left-8'
						options={{
							dark: InfinitySmallDark,
							halloween: InfinitySmallDark,
							default: InfinitySmall,
						}}
					/>
				</div>
				<button
					disabled={disabled}
					className='btn btn-primary block w-36 ml-auto mr-4 mb-4 mt-8'
					onClick={() => {
						if (formEl.isValid()) {
							disableBtn();
							createUserWithEmailAndPassword(
								auth,
								formEl.values.email,
								formEl.values.password
							)
								.then((userCredential) => {
									updateProfile(userCredential.user, {
										displayName: formEl.values.username,
									});
									return userCredential;
								})
								.then(() => {
									modals.close('signUpModal');
									toast.custom(
										<AnimatedToast>
											<Notification
												withCloseButton={false}
												withBorder
												color='green'
												radius='md'
												title='Rejestracja przebiegła pomyślnie!'>
												Teraz możesz korzystać ze wszystkich funkcji w projekcie
												INFinity.
											</Notification>
										</AnimatedToast>
									);
								})
								.catch((e) => {
									if (e.code === 'auth/email-already-in-use')
										formEl.setFieldError(
											'email',
											'Podany email został przypisany do innego konta.'
										);
									console.log(e.code);
								})
								.finally(enableBtn);
						} else {
							formEl.validate();
						}
					}}>
					{!disabled ? (
						'Zarejestruj'
					) : (
						<div className='flex justify-center'>
							<span className='animate-spin'>
								<AiOutlineLoading3Quarters />
							</span>
						</div>
					)}
				</button>
			</div>
		</>
	);
};

export default SignUp;
