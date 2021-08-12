import React from "react";
import {
  googleSignInStart,
  googleSignOutStart,
} from "./redux/user/user.action";
import { useAppSelector, useAppDispatch } from "./util/hooks";

function App() {
  const currentUser = useAppSelector((state) => state.auth.currentUser);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>vine</h1>
      <h4>
        current user is : {currentUser ? currentUser.displayName : "null"}
      </h4>
      <button onClick={() => dispatch(googleSignInStart())}>
        Google Sign In
      </button>
      <button onClick={() => dispatch(googleSignOutStart())}>
        Google Sign out
      </button>
    </div>
  );
}

export default App;
