import { takeLatest, put, call, all } from "redux-saga/effects";

import {
  googleProvider,
  auth,
  createUserProfileDocument,
} from "../../firebase/config";
import { logInSuccess, authFailure, signOutSuccess } from "./user.slice";
import UserActionTypes from "./user.type";
import { signInWithPopup } from "firebase/auth";
import { getDoc } from "firebase/firestore";

export function* getSnapshotFromUserAuth(
  userAuth: any,
  additionalData?: any[]
): Generator<any, any, any> {
  try {
    const userDoc = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield getDoc(userDoc);
    yield put(logInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(authFailure(error));
  }
}

export function* signInWithGoogle() {
  try {
    const { user } = yield signInWithPopup(auth, googleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(authFailure(error));
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(authFailure(error));
  }
}

export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_OUT_START, signOut);
}

export function* userSagas() {
  yield all([call(onGoogleSignInStart), call(onSignOutStart)]);
}
