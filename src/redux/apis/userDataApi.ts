import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { firebaseAuth } from "../../main";
import jwtDecode from "jwt-decode";
import waitForAuthInit from "../../utils/waitForAuthInit";

export const getUserToken = async () => {
  await waitForAuthInit();
  const user = firebaseAuth.currentUser;
  if (!user) return null;
  const userToken = await user.getIdToken();
  return jwtDecode<{ user_id: string }>(userToken);
};

export type Course = "kursPython" | "kursExcel" | "kursAccess" | "kursAlgo";

export interface IUserData {
  courses: (Course | "__test__")[];
}

export const userDataApi = createApi({
  reducerPath: "userData",
  baseQuery: fakeBaseQuery(),
  tagTypes: ["fullDoc"],
  endpoints: (builder) => ({
    getUserDoc: builder.query({
      queryFn: async () => {
        const userData = await getUserToken();
        if (!userData) return { data: { courses: ["__test__"] } as IUserData };

        const firestore = getFirestore();
        const currentUserDocRef = doc(firestore, `users/${userData.user_id}`);
        const userDoc = await getDoc(currentUserDocRef);

        if (!userDoc.exists())
          return { data: { courses: ["__test__"] } as IUserData };

        const data = userDoc.data() as IUserData;
        return { data };
      },
    }),
  }),
});

export const { useGetUserDocQuery } = userDataApi;
