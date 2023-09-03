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
import { firebaseApp } from '../main';
import { useDisclosure } from '@mantine/hooks';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { modals } from '@mantine/modals';
import { toast } from 'react-hot-toast';
import AnimatedToast from './AnimatedToast';

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
			//!TODO:check if username is in use (firebase call)
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
			<button
				disabled={disabled}
				className='btn btn-success block ml-auto w-36'
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
			<div className='divider'>Lub</div>
		</>
	);
};

export default SignUp;
