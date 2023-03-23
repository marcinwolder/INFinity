import { useDispatch } from 'react-redux';
import { firebaseAuth } from '../firebase';
import { authSlice } from '../redux/slices/auth';

const Main = () => {
	const dispatch = useDispatch();
	const { transitionStart, transitionEnd } = authSlice.actions;
	return (
		<div className='flex gap-2'>
			<button
				onClick={() => {
					console.log(firebaseAuth.currentUser);
				}}>
				TEST
			</button>
		</div>
	);
};

export default Main;
