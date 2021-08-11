import { configureStore } from "@reduxjs/toolkit";
import { counterSlice } from "./features/auth/authSlice";

export const store = configureStore({
  reducer: {
    auth: counterSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {auth: AuthState}
export type AppDispatch = typeof store.dispatch;
