import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import { firebaseAuth } from '../../main';
import jwtDecode from 'jwt-decode';
import waitForAuthInit from '../../utils/waitForAuthInit';
import _ from 'lodash';

const getUserToken = async () => {
	await waitForAuthInit();
	const user = firebaseAuth.currentUser;
	if (!user) return null;
	const userToken = await user.getIdToken();
	return jwtDecode<{ user_id: string }>(userToken);
};

export enum Course {
	kursPython = 'kursPython',
	kursExcel = 'kursExcel',
	kursAccess = 'kursAccess',
	kursAlgo = 'kursAlgo',
	test = '__test__',
}

export interface IUserData {
	courses: Course[];
}

const hasOwnDoc = (currentDoc: IUserData) =>
	!currentDoc.courses[0] || currentDoc.courses[0] !== Course.test;

export const userDataApi = createApi({
	reducerPath: 'userData',
	baseQuery: fakeBaseQuery(),
	tagTypes: ['fullDoc'],
	endpoints: (builder) => ({
		getUserDoc: builder.query({
			providesTags: ['fullDoc'],
			queryFn: async () => {
				const userData = await getUserToken();
				if (!userData) return { data: { courses: [Course.test] } as IUserData };

				const firestore = getFirestore();
				const currentUserDocRef = doc(firestore, `users/${userData.user_id}`);
				const userDoc = await getDoc(currentUserDocRef);

				if (!userDoc.exists())
					return { data: { courses: [Course.test] } as IUserData };

				const data = userDoc.data() as IUserData;
				return { data };
			},
		}),
		createUserDoc: builder.mutation<IUserData, { currentDoc: IUserData }>({
			invalidatesTags: (_res, err) => {
				return err ? [] : ['fullDoc'];
			},
			queryFn: async ({ currentDoc }) => {
				if (hasOwnDoc(currentDoc)) {
					return { error: 'user already have his own doc' };
				}

				const userToken = await getUserToken();
				if (!userToken) return { error: 'user is not signed in' };

				const { user_id: userId } = userToken;
				const firestore = getFirestore();
				const newDoc = doc(firestore, `users/${userId}`);

				await setDoc(newDoc, { courses: [] });

				return { data: { courses: [] } as IUserData };
			},
		}),
		addCourse: builder.mutation<
			unknown,
			{ currentDoc: IUserData; addCourses: Course[] }
		>({
			invalidatesTags: (_res, err) => {
				return err ? [] : ['fullDoc'];
			},
			queryFn: async ({ currentDoc, addCourses }) => {
				if (!hasOwnDoc(currentDoc))
					return { error: "user don't have his own doc" };

				const userToken = await getUserToken();
				if (!userToken) return { error: 'user is not signed in' };

				const newCourses = new Set(currentDoc.courses);
				addCourses.forEach((course) => newCourses.add(course));
				const courses = [...newCourses.values()];

				if (_.isEqual(currentDoc.courses, courses))
					return { error: 'no new courses' };

				const { user_id: userId } = userToken;
				const firestore = getFirestore();
				const newDoc = doc(firestore, `users/${userId}`);
				await setDoc(newDoc, { courses });

				return { data: { courses } as IUserData };
			},
		}),
		removeCourse: builder.mutation<
			unknown,
			{ currentDoc: IUserData; removeCourses: Course[] }
		>({
			invalidatesTags: (_res, err) => {
				return err ? [] : ['fullDoc'];
			},
			queryFn: async ({ currentDoc, removeCourses }) => {
				if (!hasOwnDoc(currentDoc))
					return { error: "user don't have his own doc" };

				const userToken = await getUserToken();
				if (!userToken) return { error: 'user is not signed in' };

				const courses = currentDoc.courses.filter(
					(c) => !removeCourses.includes(c)
				);

				if (_.isEqual(currentDoc.courses, courses))
					return { error: 'no new courses' };

				const { user_id: userId } = userToken;
				const firestore = getFirestore();
				const newDoc = doc(firestore, `users/${userId}`);
				await setDoc(newDoc, { courses });

				return { data: { courses } as IUserData };
			},
		}),
	}),
});

export const {
	useCreateUserDocMutation,
	useGetUserDocQuery,
	useAddCourseMutation,
	useRemoveCourseMutation,
} = userDataApi;
