import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/user.slice";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./saga";
import { saveState, loadState } from "../util/localStorage";
import throttle from "lodash/throttle";
import { feedbackSlice } from "./feedback/feedback.slice";
import logger from "../util/logger";

const persistedState = loadState();

const sagaMiddleware = createSagaMiddleware();

const middleware: any[] = [sagaMiddleware];

if (process.env.NODE_ENV === "development") {
  middleware.push(logger);
}

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    feedback: feedbackSlice.reducer,
  },
  middleware: middleware,
  preloadedState: persistedState,
});

// save to localStorage throttled to maximum once per second
store.subscribe(
  throttle(() => {
    saveState(store.getState());
  }, 1000)
);

sagaMiddleware.run(rootSaga);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {auth: AuthState}
export type AppDispatch = typeof store.dispatch;
