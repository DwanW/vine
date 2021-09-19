import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
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
    // auth actions
    logInSuccess: (state, action: PayloadAction<any>) => {
      state.currentUser = action.payload;
      state.error = null;
    },
    logOutSuccess: (_) => {
      return INITIAL_STATE;
    },
    authFailure: (state, action: PayloadAction<any>) => {
      state.error = action.payload;
    },
    // todo actions
    addTask: (state, action: PayloadAction<any>) => {
      state.currentUser.tasks = [...state.currentUser.tasks, action.payload];
    },
    addRoutine: (state, action: PayloadAction<any>) => {
      state.currentUser.routines = [
        ...state.currentUser.routines,
        action.payload,
      ];
    },
    toggleTaskCompletion: (state, action: PayloadAction<any>) => {
      const taskId = action.payload;
      const task = state.currentUser.tasks.find(
        (task: any) => task.id === taskId
      );
      if (task.isCompleted) {
        // uncheck
        task.completionDate = undefined;
      } else {
        // check
        task.completionDate = dayjs();
      }
      task.isCompleted = !task.isCompleted;
    },
    addRecord: (state, action: PayloadAction<any>) => {},
    updateRecord: (state, action: PayloadAction<any>) => {},
  },
});

export const {
  logInSuccess,
  logOutSuccess,
  authFailure,
  addTask,
  addRoutine,
  toggleTaskCompletion,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
