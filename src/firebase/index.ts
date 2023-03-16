import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: 'AIzaSyCu5u5AcqftFHZbmFwobxyY7TuPZpRQQQk',
	authDomain: 'informator-77d28.firebaseapp.com',
	projectId: 'informator-77d28',
	storageBucket: 'informator-77d28.appspot.com',
	messagingSenderId: '328966341261',
	appId: '1:328966341261:web:0b73f0fa459b07e65d98c4',
	measurementId: 'G-KJW25G617M',
};

export const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
