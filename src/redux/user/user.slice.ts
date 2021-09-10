import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface UserState {
  currentUser: any;
  error: string | null;
}

const INITIAL_STATE: UserState = {
  currentUser: null,
  error: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {
    logInSuccess: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    logOutSuccess: (state) => {
      state.currentUser = null;
      state.error = null;
    },
    signOutSuccess: (state) => {
      state.currentUser = null;
    },
    authFailure: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
  },
});

export const { logInSuccess, logOutSuccess, signOutSuccess, authFailure } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user;
