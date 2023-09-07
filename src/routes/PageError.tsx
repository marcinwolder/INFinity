import { useEffect } from 'react';
import { useNavigate, useRouteError } from 'react-router-dom';

const PageError = () => {
	const navigate = useNavigate();
	const errorMsg = useRouteError() as Error;
	console.log('🚀 ~ file: PageError.tsx:8 ~ PageError ~ errorMsg:', errorMsg);
	useEffect(() => {
		setTimeout(() => navigate('/'), 2000);
	}, [navigate]);
	return (
		<div className='flex h-screen justify-center items-center'>
			<span className='text-2xl small-caps'>
				{errorMsg.message || 'Strona której szukasz nie istnieje'}
			</span>
		</div>
	);
};

export default PageError;
