import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  doc,
  setDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "app/dataBase/firebaseAppDb";

const MEASUREMENTS_ENDPOINT = "measurements";

export const measurementsApi = createApi({
  reducerPath: "measurementsApi",
  tagTypes: ["measurement"],
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    createMeasurement: build.mutation({
      async queryFn(payload) {
        try {
          //configure newMeasurement
          const newMeasurement = {
            size: payload.size,
            type: payload.type,
          };

          //add to server
          const newRef = doc(
            db,
            MEASUREMENTS_ENDPOINT,
            payload.id,
            payload.type,
            payload.date
          );
          await setDoc(newRef, newMeasurement);
          return { data: newMeasurement };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["measurement"],
    }),

    getAllMeasurements: build.query({
      async queryFn({ id, type }) {
        try {
          const docRef = collection(db, MEASUREMENTS_ENDPOINT, id, type);
          const docSnap = await getDocs(docRef);
          const data = docSnap.docs.map((doc) => ({
            ...doc.data(),
            date: doc.id,
          }));
          return { data: data };
        } catch (error) {
          console.log(error);
          return { error: error };
        }
      },
      providesTags: ["measurement"],
    }),

    deleteMeasurement: build.mutation({
      async queryFn(payload) {
        try {
          const newRef = doc(
            db,
            MEASUREMENTS_ENDPOINT,
            payload.id,
            payload.type,
            payload.date
          );
          await deleteDoc(newRef);
          return { data: payload };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["measurement"],
    }),
    updateMeasurement: build.mutation({
      async queryFn(payload) {
        try {
          const newRef = doc(
            db,
            MEASUREMENTS_ENDPOINT,
            payload.id,
            payload.type,
            payload.date
          );
          await updateDoc(newRef, payload.data);
          return { data: payload };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["measurement"],
    }),
  }),
});

export const {
  useCreateMeasurementMutation,
  useGetAllMeasurementsQuery,
  useDeleteMeasurementMutation,
  useUpdateMeasurementMutation,
} = measurementsApi;
