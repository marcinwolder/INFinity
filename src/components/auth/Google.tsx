import {
	GoogleAuthProvider,
	signInWithPopup,
	useDeviceLanguage,
} from '@firebase/auth';
import classNames from 'classnames';
import React from 'react';
import { AiFillGoogleCircle, AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { firebaseAuth } from '../../firebase';
import { StateStore } from '../../redux';
import { authSlice } from '../../redux/slices/auth';

const Google: React.FC<{
	text: string;
}> = ({ text }) => {
	const dispatch = useDispatch();
	const { transitionStart, transitionEnd } = authSlice.actions;

	const { transition } = useSelector((state: StateStore) => state.auth);

	const onGoogleSignUp = () => {
		dispatch(transitionStart());

		const provider = new GoogleAuthProvider();
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
				'flex items-center gap-2 btn btn-wide hover:bg-red-600 hover:text-white mt-4',
				{ 'btn-disabled': transition }
			)}
			onClick={() => {
				onGoogleSignUp();
			}}>
			{transition ? (
				<AiOutlineLoading3Quarters className='animate-spin duration-1000 text-xl' />
			) : (
				<>
					{text}
					<AiFillGoogleCircle />
				</>
			)}
		</button>
	);
};

export default Google;
