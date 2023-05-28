import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "app/dataBase/firebaseAppDb";

const MEASUREMENTS_ENDPOINT = "measurements";
const NOTES_ENDPOINT = "notes";

export const notesApi = createApi({
  reducerPath: "notesApi",
  tagTypes: ["notes"],
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    createNote: build.mutation({
      async queryFn(payload) {
        try {
          const newRef = doc(
            db,
            MEASUREMENTS_ENDPOINT,
            payload.id,
            NOTES_ENDPOINT,
            payload.type
          );
          await setDoc(newRef, { note: payload.note });
          console.log(payload);
          return { data: { payload } };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["notes"],
    }),

    getNotes: build.query({
      async queryFn(id) {
        try {
          const docRef = collection(
            db,
            MEASUREMENTS_ENDPOINT,
            id,
            NOTES_ENDPOINT
          );
          const docSnap = await getDocs(docRef);
          const data = docSnap.docs.map((doc) => ({
            type: doc.id,
            note: doc.data().note,
          }));
          return { data: data };
        } catch (error) {
          return { error: error };
        }
      },
      providesTags: ["notes"],
    }),
  }),
});

export const { useCreateNoteMutation, useGetNotesQuery } = notesApi;
