import { firebaseAuth } from '../firebase';

const Main = () => {
	return (
		<button
			onClick={() => {
				console.log(firebaseAuth.currentUser);
			}}>
			TEST
		</button>
	);
};

export default Main;
