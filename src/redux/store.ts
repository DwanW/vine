import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "./user/user.slice";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./saga";
import { saveState, loadState } from "../util/localStorage";
import throttle from "lodash/throttle";

const persistedState = loadState();

const sagaMiddleware = createSagaMiddleware();

export const store = configureStore({
  reducer: {
    auth: userSlice.reducer,
  },
  middleware: [sagaMiddleware],
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
