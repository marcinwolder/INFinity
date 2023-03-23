import {
	FacebookAuthProvider,
	useDeviceLanguage,
	signInWithPopup,
} from '@firebase/auth';
import classNames from 'classnames';
import React from 'react';
import { AiFillFacebook, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { firebaseAuth } from '../../firebase';
import { StateStore } from '../../redux';
import { authSlice } from '../../redux/slices/auth';

const Facebook: React.FC<{
	text: string;
}> = ({ text }) => {
	const dispatch = useDispatch();
	const { transitionStart, transitionEnd, setOpen } = authSlice.actions;

	const { transition } = useSelector((state: StateStore) => state.auth);

	const onFacebookSignUp = () => {
		dispatch(transitionStart());
		const provider = new FacebookAuthProvider();
		useDeviceLanguage(firebaseAuth);
		(async () => {
			try {
				await signInWithPopup(firebaseAuth, provider);
				dispatch(transitionEnd());
			} catch (error) {
				dispatch(transitionEnd());
				toast('Akcja zakończona niepowodzeniem!');
			}
		})();
	};
	return (
		<button
			className={classNames(
				'flex items-center gap-2 btn btn-wide hover:bg-blue-700 hover:text-white mt-2',
				{ 'btn-disabled': transition }
			)}
			onClick={() => {
				onFacebookSignUp();
			}}>
			{transition ? (
				<AiOutlineLoading3Quarters className='animate-spin duration-1000 text-xl' />
			) : (
				<>
					{text}
					<AiFillFacebook />
				</>
			)}
		</button>
	);
};

export default Facebook;
