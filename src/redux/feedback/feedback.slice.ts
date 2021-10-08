import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface FeedbackState {
  snackbarOpen: boolean;
  snackbarMessage: string | null;
  confirmOpen: boolean;
  confirmActionMsg: string | null;
  confirmFunc: () => void;
}

const INITIAL_STATE: FeedbackState = {
  snackbarOpen: false,
  snackbarMessage: null,
  confirmOpen: false,
  confirmActionMsg: null,
  confirmFunc: () => null,
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
    openConfirmDialog: (
      state,
      action: PayloadAction<{ message: string | null; confirmFunc: () => void }>
    ) => {
      state.confirmOpen = true;
      state.confirmActionMsg = action.payload.message;
      state.confirmFunc = action.payload.confirmFunc;
    },
    closeConfirmDialog: (state) => {
      state.confirmOpen = false;
      state.confirmActionMsg = null;
      state.confirmFunc = () => null;
    },
  },
});

export const {
  openSnackBar,
  closeSnackBar,
  openConfirmDialog,
  closeConfirmDialog,
} = feedbackSlice.actions;

export const selectFeedback = (state: RootState) => state.feedback;
