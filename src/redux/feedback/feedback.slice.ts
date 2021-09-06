import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface FeedbackState {
  snackbarOpen: boolean;
  snackbarMessage: string | null;
}

const INITIAL_STATE: FeedbackState = {
  snackbarOpen: false,
  snackbarMessage: null,
};

export const feedbackSlice = createSlice({
  name: "feedback",
  initialState: INITIAL_STATE,
  reducers: {
    openSnackBar: (state, action: PayloadAction<any>) => {
      state.snackbarOpen = true;
      state.snackbarMessage = action.payload;
    },
    closeSnackBar: (state) => {
      state.snackbarOpen = false;
      state.snackbarMessage = null;
    },
  },
});

export const { openSnackBar, closeSnackBar } = feedbackSlice.actions;

export const selectFeedback = (state: RootState) => state.feedback;
