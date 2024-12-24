import { configureStore } from "@reduxjs/toolkit";
import deadliestSlice from "./slices/deadliestSlice";

const store = configureStore({
    reducer: {
        deadliestSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
