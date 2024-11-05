import { configureStore } from "@reduxjs/toolkit";
import authUserInfo from "./slices/auth.slice";

export const store = configureStore({
  reducer: {
    auth: authUserInfo,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
