import { modals } from '@mantine/modals';

const AuthComp = () => {
	const openModal = () =>
		modals.open({
			title: <p>Zaloguj się</p>,
			children: <p className='text-red-400'>TEST</p>,
		});

	return (
		<div className='btn text-xs px-2 gap-0 w-min md:w-fit' onClick={openModal}>
			<div className='m-2'>
				<span className='inline-block'>ZALOGUJ</span>{' '}
				<span className='hidden md:inline'>/</span>{' '}
				<span className='inline-block'>ZAREJESTRUJ</span>
			</div>
		</div>
	);
};

export default AuthComp;
