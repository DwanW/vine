import UserActionTypes from "./user.type";

// actions listened by saga
export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START,
});

export const googleSignOutStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_OUT_START,
});
