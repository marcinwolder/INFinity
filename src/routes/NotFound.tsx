import React, { useEffect } from 'react';
import { TbError404 } from 'react-icons/tb';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
	const navigate = useNavigate();
	useEffect(() => {
		setTimeout(() => navigate('/'), 2000);
	}, []);
	return (
		<div className='flex h-screen justify-center items-center'>
			<span className='text-2xl small-caps'>
				Strona której szukasz nie istnieje
			</span>
			<TbError404 className='ml-2 text-5xl' />
		</div>
	);
};

export default NotFound;
