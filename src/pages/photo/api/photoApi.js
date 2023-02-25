import { createApi, fakeBaseQuery } from "@reduxjs/toolkit/query/react";
import { db, storage } from "app/dataBase/firebaseAppDb";
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  collection,
  getDocs,
} from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";

const PHOTOS_ENDPOINT = "photos";

export const photoApi = createApi({
  reducerPath: "photoApi",
  tagTypes: ["photo"],
  baseQuery: fakeBaseQuery(),
  endpoints: (build) => ({
    addPhoto: build.mutation({
      async queryFn(payload) {
        try {
          //add to firestore
          const photoRef = doc(
            db,
            PHOTOS_ENDPOINT,
            payload.id,
            payload.date,
            payload.type
          );
          await setDoc(photoRef, { [payload.type]: payload.image });

          //add dates Array
          const refIdPhotos = doc(db, PHOTOS_ENDPOINT, payload.id);
          await updateDoc(refIdPhotos, {
            datesArray: arrayUnion(payload.date),
          });

          return {
            data: { payload },
          };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["photo"],
    }),
    deletePhoto: build.mutation({
      async queryFn(payload) {
        try {
          console.log(payload);
          const photoRefStorage = ref(
            storage,
            `${payload.id}/${payload.date}/${payload.type}`
          );

          const data = await deleteObject(photoRefStorage);
          console.log(data);

          //delete from firestore
          const photoRef = doc(
            db,
            PHOTOS_ENDPOINT,
            payload.id,
            payload.date,
            payload.type
          );
          await deleteDoc(photoRef);

          //check isEmpty date
          const dateRef = collection(
            db,
            PHOTOS_ENDPOINT,
            payload.id,
            payload.date
          );

          const { empty } = await getDocs(dateRef);
          if (empty) {
            const refIdPhotos = doc(db, PHOTOS_ENDPOINT, payload.id);
            await updateDoc(refIdPhotos, {
              datesArray: arrayRemove(payload.date),
            });
          }

          return {
            data: { payload },
          };
        } catch (error) {
          return { error: error };
        }
      },
      invalidatesTags: ["photo"],
    }),

    getAllPhotos: build.query({
      async queryFn(id) {
        try {
          const refIdPhotos = doc(db, PHOTOS_ENDPOINT, id);
          const allDataSnap = await getDoc(refIdPhotos);
          const datesArray = allDataSnap.data().datesArray;
          if (!datesArray) {
            return { data: {} };
          }

          const allPhotos = {};

          for (const date of datesArray) {
            const datePhotosRef = collection(db, PHOTOS_ENDPOINT, id, date);
            const datePhotos = await getDocs(datePhotosRef);
            const datePhotosUrl = datePhotos.docs.map((doc) => doc.data());
            allPhotos[date] = datePhotosUrl;
          }

          return { data: allPhotos };
        } catch (error) {
          return { error: error };
        }
      },
      providesTags: ["photo"],
    }),
  }),
});

export const {
  useAddPhotoMutation,
  useGetAllPhotosQuery,
  useDeletePhotoMutation,
} = photoApi;
