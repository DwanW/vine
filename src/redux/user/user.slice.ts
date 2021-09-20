import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import type { RootState } from "../store";
import { v4 } from "uuid";
import { ProgressRecord } from "../../util/types";

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
    addRecord: (state, action: PayloadAction<any>) => {
      const { id, value, isCompleted } = action.payload;
      let newRecord: ProgressRecord = {
        recordId: v4(),
        date: dayjs(),
        value,
        isCompleted,
      };
      let routine = state.currentUser.routines.find(
        (routine: any) => routine.id === id
      );
      routine.records.push(newRecord);
    },
    updateRecord: (state, action: PayloadAction<any>) => {
      const { id, recordId, value, isCompleted } = action.payload;
      let routine = state.currentUser.routines.find(
        (routine: any) => routine.id === id
      );
      let record = routine.records.find(
        (record: ProgressRecord) => record.recordId === recordId
      );
      record.value = value;
      record.isCompleted = isCompleted;
    },
    resetRecord: (state, action) => {
      const id = action.payload;
      let routine = state.currentUser.routines.find(
        (routine: any) => routine.id === id
      );
      routine.records = [];
    },
  },
});

export const {
  logInSuccess,
  logOutSuccess,
  authFailure,
  addTask,
  addRoutine,
  toggleTaskCompletion,
  addRecord,
  updateRecord,
} = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
