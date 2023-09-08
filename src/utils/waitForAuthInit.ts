import { User } from 'firebase/auth';
import { firebaseAuth } from '../main';

const waitForAuthInit = () =>
	new Promise<User | null>((resolve, reject) => {
		const unsubscribe = firebaseAuth.onAuthStateChanged((user) => {
			unsubscribe();
			resolve(user);
		}, reject);
	});

export default waitForAuthInit;
