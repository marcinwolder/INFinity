import {
	FacebookAuthProvider,
	useDeviceLanguage,
	signInWithPopup,
} from '@firebase/auth';
import React from 'react';
import { AiFillFacebook } from 'react-icons/ai';
import { toast } from 'react-toastify';
import { firebaseAuth } from '../../firebase';

const Facebook: React.FC<{
	text: string;
	setTransition: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setTransition, text }) => {
	const onFacebookSignUp = () => {
		setTransition(true);
		const provider = new FacebookAuthProvider();
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
			className='flex items-center gap-2 btn btn-wide hover:bg-blue-700 hover:text-white mt-2'
			onClick={() => {
				onFacebookSignUp();
			}}>
			{text} <AiFillFacebook />
		</button>
	);
};

export default Facebook;
