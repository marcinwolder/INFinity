import { PasswordInput, TextInput } from '@mantine/core';
import {
	useForm,
	hasLength,
	matchesField,
	isEmail,
	matches,
} from '@mantine/form';

const SignUp = () => {
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
					label='Nazwa użytkownika: '
					{...formEl.getInputProps('username')}
				/>
				<TextInput
					label='Email: '
					placeholder='email@test.pl'
					{...formEl.getInputProps('email')}
				/>
				<PasswordInput label='Hasło:' {...formEl.getInputProps('password')} />
				<PasswordInput
					label='Potwierdź hasło:'
					{...formEl.getInputProps('confirmPassword')}
				/>
			</form>
			<button
				className='btn btn-success block ml-auto'
				onClick={() => console.log(formEl.isValid())}>
				Zarejestruj
			</button>
			<div className='divider'>Lub</div>
		</>
	);
};

export default SignUp;
