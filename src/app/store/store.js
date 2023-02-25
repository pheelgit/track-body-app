import { configureStore } from "@reduxjs/toolkit";

// import { userApi } from "shared/api";
import { userApi } from "shared/api/userApi";
import { measurementsApi } from "pages/currMeasuremetn/api/measurementsApi";
import { notesApi } from "pages/currMeasuremetn/api/notesApi";
import { photoApi } from "pages/photo/api/photoApi";

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [measurementsApi.reducerPath]: measurementsApi.reducer,
    [notesApi.reducerPath]: notesApi.reducer,
    [photoApi.reducerPath]: photoApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(measurementsApi.middleware)
      .concat(notesApi.middleware)
      .concat(photoApi.middleware),
});
