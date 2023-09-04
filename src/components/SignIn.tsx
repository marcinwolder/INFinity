import { PasswordInput, TextInput, Notification } from '@mantine/core';
import { useForm, hasLength, isEmail, matches } from '@mantine/form';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useDisclosure } from '@mantine/hooks';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { modals } from '@mantine/modals';
import { toast } from 'react-hot-toast';

import { firebaseApp } from '../main';
import AnimatedToast from './AnimatedToast';

import InfinitySmallDark from './../img/InfinitySmall-dark.png';
import InfinitySmall from './../img/InfinitySmall.png';
import LightDarkThemeImg from './LightDarkThemeImg';

const SignIn = () => {
	const auth = getAuth(firebaseApp);
	const [disabled, { open: disableBtn, close: enableBtn }] = useDisclosure();

	const formEl = useForm({
		validateInputOnBlur: true,
		initialValues: {
			email: '',
			password: '',
		},
		validate: {
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
		},
	});

	const onSubmit = () => {
		if (formEl.isValid()) {
			disableBtn();
			signInWithEmailAndPassword(
				auth,
				formEl.values.email,
				formEl.values.password
			)
				.then(() => {
					modals.close('signInModal');
					toast.custom(
						<AnimatedToast>
							<Notification
								withCloseButton={false}
								withBorder
								color='green'
								radius='md'
								title='Zostałeś pomyślnie zalogowany!'>
								Witamy ponownie 😀
							</Notification>
						</AnimatedToast>
					);
				})
				.catch((e) => {
					if (
						e.code === 'auth/user-not-found' ||
						e.code === 'auth/wrong-password'
					)
						toast.custom(
							<AnimatedToast>
								<Notification
									withCloseButton={false}
									withBorder
									color='red'
									title='Błędne dane.'>
									Sprawdź czy wpisane hasło oraz email są poprawne.
								</Notification>
							</AnimatedToast>
						);
					// console.log(e.code);
				})
				.finally(enableBtn);
		} else {
			formEl.validate();
		}
	};

	return (
		<>
			<form
				className='mb-2'
				onKeyDown={(e) => {
					if (e.key === 'Enter') onSubmit();
				}}>
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
			</form>
			<div className='flex'>
				<div className='w-40 h-20 place-self-end border-dashed overflow-hidden border-base-content border-l-2 border-b-2 rounded-bl-lg '>
					{/* TODO: ANIMATED DRAWING LOGO HERE */}
					<LightDarkThemeImg
						className='h-40 w-48 relative -top-4 -left-8'
						light={InfinitySmall}
						dark={InfinitySmallDark}
					/>
				</div>
				<button
					disabled={disabled}
					className='btn w-28 md:w-36 btn-primary block ml-auto mr-4 mb-4 mt-8'
					onClick={onSubmit}>
					{!disabled ? (
						'Zaloguj'
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

export default SignIn;
