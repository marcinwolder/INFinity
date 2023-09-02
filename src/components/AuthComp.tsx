import { modals } from '@mantine/modals';

const AuthComp = () => {
	const openSignUpModal = () =>
		modals.open({
			modalId: 'signUpModal',
			title: (
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
			),
			children: <p className='text-red-400'>TEST</p>,
		});
	const openSignInModal = () =>
		modals.open({
			modalId: 'signInModal',
			title: (
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
			),
			children: <p className='text-red-400'>TEST</p>,
		});

	return (
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
