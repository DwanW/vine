import { ReactElement } from "react";
import {
  googleSignInStart,
  googleSignOutStart,
} from "../../redux/user/user.action";
import { useAppSelector, useAppDispatch } from "../../util/hooks";
import AuthButton from "../button/auth-button.comp";
import { AuthContainer, NameContainer } from "./auth.style";

export default function AuthComp(): ReactElement {
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const dispatch = useAppDispatch();

  // console.log(currentUser);

  if (!currentUser.id) {
    return (
      <AuthContainer>
        <AuthButton
          src="assets/icon/login.svg"
          onClick={() => dispatch(googleSignInStart())}
        >
          Sign In
        </AuthButton>
      </AuthContainer>
    );
  }

  return (
    <AuthContainer>
      <NameContainer>{currentUser.displayName.split(" ")[0]}</NameContainer>
      <AuthButton
        src="assets/icon/logout.svg"
        onClick={() => dispatch(googleSignOutStart())}
      >
        Sign out
      </AuthButton>
    </AuthContainer>
  );
}
