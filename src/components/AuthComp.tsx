import React from 'react';

const AuthComp = () => {
	return (
		<div className='btn text-xs px-2 gap-0 w-min md:w-fit'>
			<div className='m-2'>
				<span className='inline-block'>ZALOGUJ</span>{' '}
				<span className='hidden md:inline'>/</span>{' '}
				<span className='inline-block'>ZAREJESTRUJ</span>
			</div>
		</div>
	);
};

export default AuthComp;
