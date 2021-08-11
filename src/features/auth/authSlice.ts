import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../store";

interface AuthState {
  uid: number;
}

const initialState: AuthState = {
  uid: 0,
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<number>) => {
      state.uid = action.payload;
    },
    logout: (state) => {
      state.uid = 0;
    },
  },
});

export const { login, logout } = counterSlice.actions;

export const selectAuth = (state: RootState) => state.auth;
