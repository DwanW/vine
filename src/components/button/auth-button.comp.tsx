import { ReactChild } from "react";
import { AuthButtonContainer, AuthButtonImg } from "./auth-button.styles";

interface Props {
  onClick: () => {};
  children: ReactChild;
  src: string;
}

const AuthButton = ({ onClick, children, src }: Props) => {
  return (
    <AuthButtonContainer onClick={onClick}>
      <AuthButtonImg src={src} alt="icon-button" />
      {children}
    </AuthButtonContainer>
  );
};

export default AuthButton;
