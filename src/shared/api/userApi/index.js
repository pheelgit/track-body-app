import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc, getDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "app/dataBase/firebaseAppDb";
import { authService } from "shared/api/authService";

const USER_ENDPOINT = "users";

export const userApi = createApi({
  reducerPath: "userApi",
  tagTypes: ["user"],
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    createUser: build.mutation({
      async queryFn(payload) {
        try {
          //auth
          const { user } = await createUserWithEmailAndPassword(
            auth,
            payload.email,
            payload.password
          );

          //configure newUser
          const newUser = {
            nickName: payload.nickName,
            email: user.email,
            id: user.uid,
            token: user.accessToken,
            gender: null,
            age: null,
            height: null,
          };
          console.log(newUser);
          //add to server

          await setDoc(doc(db, USER_ENDPOINT, newUser.id), newUser);
          // data or body,вроде не ломается ничего
          return { data: newUser };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["user"],
    }),

    updateUser: build.mutation({
      async queryFn({ id, values }) {
        try {
          const docRef = doc(db, USER_ENDPOINT, id);
          await updateDoc(docRef, values);
          return { data: values };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["user"],
    }),

    getUserData: build.query({
      async queryFn() {
        try {
          const CURR_ID = authService.isAuth();
          if (!CURR_ID) return { data: {} };
          const docRef = doc(db, USER_ENDPOINT, CURR_ID);
          const docSnap = await getDoc(docRef);
          const data = docSnap.data();
          return { data: data };
        } catch (error) {
          return { error: error };
        }
      },
      providesTags: ["user"],
    }),
  }),
});
