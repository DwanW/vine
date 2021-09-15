import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface UserState {
  currentUser: any;
  error: string | null;
}

const initialUserObj = {
  categories: [],
  createdAt: undefined,
  displayName: undefined,
  email: undefined,
  id: undefined,
  tasks: [],
  routines: [],
};

const INITIAL_STATE: UserState = {
  currentUser: initialUserObj,
  error: null,
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
      state.currentUser = initialUserObj;
      state.error = null;
    },
    authFailure: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    addTask: (state, action: PayloadAction<any>) => {
      state.currentUser.tasks = [...state.currentUser.tasks, action.payload];
    },
    addRoutine: (state, action: PayloadAction<any>) => {
      state.currentUser.routines = [
        ...state.currentUser.routines,
        action.payload,
      ];
    },
  },
});

export const { logInSuccess, logOutSuccess, authFailure, addTask, addRoutine } =
  userSlice.actions;

export const selectUser = (state: RootState) => state.user;
