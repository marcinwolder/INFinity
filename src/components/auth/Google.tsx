import {
	GoogleAuthProvider,
	signInWithPopup,
	useDeviceLanguage,
} from '@firebase/auth';
import React from 'react';
import { AiFillGoogleCircle } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { firebaseAuth } from '../../firebase';

const Google: React.FC<{
	text: string;
	setTransition: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ text, setTransition }) => {
	const onGoogleSignUp = () => {
		setTransition(true);
		const provider = new GoogleAuthProvider();
		useDeviceLanguage(firebaseAuth);
		(async () => {
			try {
				await signInWithPopup(firebaseAuth, provider);
				setTransition(false);
			} catch (error) {
				setTransition(false);
				toast('Akcja zakończona niepowodzeniem!');
			}
		})();
	};
	return (
		<button
			onClick={() => {
				onGoogleSignUp();
			}}
			className='flex items-center gap-2 btn btn-wide hover:bg-red-600 hover:text-white mt-4'>
			{text} <AiFillGoogleCircle />
		</button>
	);
};

export default Google;
